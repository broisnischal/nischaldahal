import type { Route } from '#.react-router/types/app/routes/r/mail/+types/index.ts';
import DOMPurify from 'dompurify';
import { parseAsString, useQueryState } from 'nuqs';
import { createLoader } from 'nuqs/server';
import quotedPrintable from 'quoted-printable';
import { useEffect, useRef, useState } from 'react';
import { data, useNavigate, useRevalidator } from 'react-router';
import { ClientOnly } from 'remix-utils/client-only';
import { up } from 'up-fetch';
import { z } from 'zod';

const { decode } = quotedPrintable;

export const upfetch = up(fetch);

// interface Mail {
//   from: string;
//   to: string;
//   subject: string;
//   body: string;
//   send_at: string;
// attachments: {
// 	filename: string;
// 	contentType: string;
// 	content: string;
// }[];
// }

const mailSchema = z.array(
  z.object({
    from: z.string(),
    to: z.string(),
    subject: z.string(),
    body: z.string(),
    sent_at: z.string(),
  }),
);

type Mail = z.infer<typeof mailSchema>[number];

export const coordinatesSearchParams = {
  email: parseAsString,
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

export async function loader({ request }: Route.LoaderArgs) {
  const { email } = loadSearchParams(request);

  if (email) {
    const mailUrl = process.env.API_URL + '/inbox/' + email;

    const mails = await upfetch(mailUrl, {
      schema: mailSchema,
    });

    return data({
      mails,
    });
  }

  const generateMail = async () => {
    const mailUrl = process.env.API_URL + '/generate';

    const mails = await upfetch(mailUrl, {
      schema: z.object({
        email: z.string(),
      }),
    });
    return mails;
  };

  const mail = await generateMail();

  return data(
    {
      mail,
    },
    {
      headers: {
        'Set-Cookie': `email=${mail.email}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    },
  );
}

export default function Mail({ loaderData }: Route.ComponentProps) {
  const [email, setEmail] = useQueryState('email', parseAsString);

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  // useEffect(() => {
  //   if ('mail' in loaderData) {
  //     setEmail(loaderData.mail.email);
  //     navigator.clipboard.writeText(loaderData.mail.email);
  //     localStorage.setItem('email', loaderData.mail.email);
  //   }
  // }, [loaderData]);

  useEffect(() => {
    if ('mail' in loaderData) {
      const existingEmail = localStorage.getItem('email');
      if (existingEmail) {
        setEmail(existingEmail);
      } else {
        setEmail(loaderData.mail.email);
        navigator.clipboard.writeText(loaderData.mail.email);
        localStorage.setItem('email', loaderData.mail.email);
      }
    }
  }, [loaderData]);

  useEffect(() => {
    if (!email) return;

    const fetchMails = async () => {
      if (document.visibilityState === 'visible') {
        revalidator.revalidate();
      }
    };

    fetchMails(); // Fetch immediately

    const interval = setInterval(fetchMails, 5000); // Poll every 5s

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        revalidator.revalidate(); // Fetch when user returns
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [email]);

  // if ('mail' in loaderData) {
  //   const existingEmail = localStorage.getItem('email');
  //   if (existingEmail) {
  //     setEmail(existingEmail);
  //   } else {
  //     setEmail(loaderData.mail.email);
  //     navigator.clipboard.writeText(loaderData.mail.email);
  //     localStorage.setItem('email', loaderData.mail.email);
  //   }
  // }

  if ('mails' in loaderData) {
    return loaderData.mails.length > 0 ? (
      <ClientOnly>
        {() => (
          <div className="flex flex-col gap-4 my-5">
            {loaderData.mails.map((mail: Mail) => (
              <MailItem
                key={`${mail.from}-${mail.to}-${mail.subject}-${mail.sent_at}`}
                {...mail}
              />
            ))}
          </div>
        )}
      </ClientOnly>
    ) : (
      <div className="flex items-start flex-col gap-4 py-10">
        <h1 className="text-2xl font-bold">Your inbox is empty!</h1>
        <p className="text-gray-500">Reload to receive new emails!</p>
        <button
          className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:text-gray-700"
          onClick={() => {
            localStorage.removeItem('email');
            setEmail(null);
          }}
        >
          Clear email
        </button>
      </div>
    );
  }

  if ('mail' in loaderData) {
    return <MailGenerate email={loaderData.mail.email} />;
  }

  return <></>;
}

function MailItem(mail: Mail) {
  const { from, to, subject, body, sent_at } = mail;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div
      onClick={openDialog}
      className="fle  flex-col gap-1 border-b py-2  border-gray-200"
    >
      <h2 className="text-lg font-bold cursor-pointer">{subject}</h2>
      <p className="text-sm text-gray-500 cursor-pointer">{from}</p>

      <p className="text-sm text-gray-500">
        {new Date(sent_at).toDateString()}
      </p>

      <dialog
        ref={dialogRef}
        className="p-10 w-full m-auto shadow-lg  max-w-3xl backdrop:bg-black/50"
      >
        <div className="flex flex-col m-auto gap-4">
          <div className="flex self-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <EmailComponent email={mail} />
        </div>
      </dialog>
    </div>
  );
}

// const EmailComponent = ({ email }: { email: Mail }) => {
//   const [sanitizedBody, setSanitizedBody] = useState('');

//   useEffect(() => {
//     const processEmail = () => {
//       try {
//         const htmlContent = extractHtmlPart(email.body);
//         const clean = DOMPurify.sanitize(htmlContent, {
//           USE_PROFILES: { html: true },
//           ALLOWED_TAGS: [
//             'div',
//             'p',
//             'a',
//             'span',
//             'br',
//             'img',
//             'h1',
//             'h2',
//             'h3',
//             'ul',
//             'ol',
//             'li',
//             'style',
//           ],
//           ALLOWED_ATTR: [
//             'href',
//             'src',
//             'alt',
//             'style',
//             'class',
//             'target',
//             'rel',
//           ],
//         });

//         setSanitizedBody(clean);
//       } catch (error) {
//         console.error('Error processing email:', error);
//         setSanitizedBody(email.body);
//       }
//     };

//     processEmail();
//   }, [email.body]);

//   return (
//     <div className="email-container bg-white rounded-lg shadow-md p-6 mb-4">
//       {/* Header remains the same */}
//       <div className="email-body overflow-auto max-h-96 prose prose-sm">
//         <div dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
//       </div>
//     </div>
//   );
// };
const EmailComponent = ({ email }: { email: Mail }) => {
  const [sanitizedBody, setSanitizedBody] = useState('');

  useEffect(() => {
    const processEmailBody = () => {
      try {
        // Parse MIME content
        const { html, plainText } = parseMimeContent(email.body);

        // Decode quoted-printable content
        const decoded = decode(html || plainText || email.body);

        // Extract HTML content
        const htmlContent = extractHtmlPart(decoded);

        // Sanitize the content
        const clean = DOMPurify.sanitize(htmlContent, {
          USE_PROFILES: { html: true },
          ALLOWED_TAGS: [
            'div',
            'p',
            'a',
            'span',
            'br',
            'img',
            'h1',
            'h2',
            'h3',
            'ul',
            'ol',
            'li',
          ],
          ALLOWED_ATTR: [
            'href',
            'src',
            'alt',
            'style',
            'class',
            'target',
            'rel',
          ],
        });

        setSanitizedBody(clean);
      } catch (error) {
        console.error('Error processing email body:', error);
        setSanitizedBody(email.body); // Fallback to raw body
      }
    };

    processEmailBody();
  }, [email.body]);

  return (
    <div className="email-container  bg-white  rounded-lg ">
      <div className="email-header border-b ">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {email.subject}
          </h2>
          <span className="text-sm text-gray-500">
            {new Date(email.sent_at).toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {/* <p>
            <span className="font-medium">From:</span> {email.from}
          </p> */}
          <p>{/* <span className="font-medium">To:</span> {email.to} */}</p>
        </div>
      </div>

      <div className="email-body  prose prose-sm">
        <div
          className=" text-black"
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
        />
      </div>
    </div>
  );
};

const parseMimeContent = (body: string) => {
  // @ts-expect-error
  const boundary = body.split('\n')[0].trim(); // Extract the boundary
  const parts = body.split(boundary); // Split the content by boundary

  const result: { html?: string; plainText?: string } = {};

  parts.forEach((part) => {
    if (part.includes('Content-Type: text/html')) {
      result.html = part.split('\n\n')[1]; // Extract HTML content
    } else if (part.includes('Content-Type: text/plain')) {
      result.plainText = part.split('\n\n')[1]; // Extract plain text content
    } // remove this line, if  Content-Type: text/html; charset=utf-8 Mime-Version: 1.0
    else if (part.includes('Content-Type: text/html')) {
      result.html = part.split('\n\n')[2];
    }
  });

  return result;
};

const decodeQuotedPrintable = (str: string) => {
  return str
    .replace(/=([A-Fa-f0-9]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/_/g, ' ')
    .replace(/=\r?\n/g, '');
};

const extractHtmlPart = (body: string) => {
  const boundaryMatch = body.match(/--([a-f0-9]+)/);
  if (!boundaryMatch) return body;

  const boundary = `--${boundaryMatch[1]}`;
  const parts = body.split(boundary);

  for (const part of parts) {
    if (part.includes('Content-Type: text/html')) {
      const cleaned = part
        .replace(/Content-Transfer-Encoding: quoted-printable/gi, '')
        .replace(/Content-Type: text\/html[^]*?\n\n/gi, '');

      return decodeQuotedPrintable(cleaned.trim());
    }
  }

  return body;
};

function MailGenerate({ email }: { email: string }) {
  return (
    <div className="flex items-start flex-col gap-4 py-10">
      <h1 className="text-2xl font-bold">Email</h1>
      <p className="text-lg">{email}</p>

      <button
        className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:text-gray-700"
        onClick={() => {
          navigator.clipboard.writeText(email);
          alert('Email copied to clipboard');
        }}
      >
        Copy email
      </button>

      <p className="text-sm text-gray-500">Reload to recieve mails!</p>
    </div>
  );
}
