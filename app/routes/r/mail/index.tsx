import { CommonLayout } from "#app/components/ui/common_layout.tsx";
import { z } from "zod";
import { up } from 'up-fetch'
import { data, useNavigate } from "react-router";
import type { Route } from "#.react-router/types/app/routes/r/mail/+types/index.ts";
import { useQueryState, parseAsString } from "nuqs";
import { useEffect, useRef } from "react";
import { createLoader } from "nuqs/server";
import { Letter } from 'react-letter';
import { extract } from 'letterparser';
import { ClientOnly } from "remix-utils/client-only";


export const upfetch = up(fetch)

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


const mailSchema = z.array(z.object({
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  body: z.string(),
  sent_at: z.string(),
}))

type Mail = z.infer<typeof mailSchema>[number]


export const coordinatesSearchParams = {
  email: parseAsString
}

export const loadSearchParams = createLoader(coordinatesSearchParams)


export async function loader({ request }: Route.LoaderArgs) {

  const { email } = loadSearchParams(request)



  if (email) {

    const mailUrl = process.env.API_URL + '/inbox/' + email;

    const mails = await upfetch(mailUrl, {
      schema: mailSchema
    })
    return data({
      mails
    })
  }

  const generateMail = async () => {
    const mailUrl = process.env.API_URL + '/generate';

    const mails = await upfetch(mailUrl, {
      schema: z.object({
        email: z.string()
      })
    })
    return mails
  }

  const mail = await generateMail()

  return data({
    mail
  }, {
    headers: {
      'Set-Cookie': `email=${mail.email}; Path=/; HttpOnly; Secure; SameSite=Strict`
    }
  })

}
 

export default function Mail({ loaderData }: Route.ComponentProps) {
  const [email, setEmail] = useQueryState('email', parseAsString);
  const navigate = useNavigate(); 

  // Email initialization effect
  // useEffect(() => {
  //   if ("mail" in loaderData) {
  //     const existingEmail = localStorage.getItem('email');
  //     if(existingEmail) {
  //       setEmail(existingEmail);
  //     } else {
  //       setEmail(loaderData.mail.email);
  //       navigator.clipboard.writeText(loaderData.mail.email);
  //       localStorage.setItem('email', loaderData.mail.email);
  //     }
  //   } 
  // }, [loaderData, setEmail]);

  // Polling effect
  // useEffect(() => {
  //   if (!email) return;
 
  //   const pollInterval = setInterval(() => {
  //     navigate('.', { replace: true });
  //   }, 1000);

  //   return () => clearInterval(pollInterval);
  // }, [email, navigate]);

  if("mails" in loaderData) {
    return loaderData.mails.length > 0 ? (
      <ClientOnly>
        {() => (
           <div className="flex flex-col gap-4 my-5">
           {loaderData.mails.map((mail: Mail) => <MailItem key={`${mail.from}-${mail.to}-${mail.subject}-${mail.sent_at}`} {...mail} />)}
         </div>
        )}
      </ClientOnly>


    ) : <div className="flex items-start flex-col gap-4 py-10">


      <h1 className="text-2xl font-bold">Your inbox is empty!</h1>
      <p className="text-gray-500">
        Reload to receive new emails!
      </p>
      <button className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:text-gray-700" onClick={() => {
        localStorage.removeItem('email');
        setEmail(null);
      }}>
        Clear email
      </button>

    </div>
  }

  if("mail" in loaderData) {
    return <MailGenerate email={loaderData.mail.email} />
  }

  return <></>
}



function MailItem(mail: Mail) {
  const { from, to, subject, body, sent_at } = mail;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { text, html, } = extract(body);

  console.log(body)


  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div onClick={openDialog} className="fle  flex-col gap-2 py-2 border-gray-200">

      <h2 className="text-lg font-bold cursor-pointer">{subject}</h2>
      <p className="text-sm text-gray-500 cursor-pointer">{from}</p>

      <p className="text-sm text-gray-500">{new Date(sent_at).toDateString()}</p>


      <dialog
        ref={dialogRef}
        className="p-10 w-full max-w-2xl m-auto shadow-lg backdrop:bg-black/50"
      >
        <div className="flex flex-col gap-4 min-w-[300px] m-auto">
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
          <div className="space-y-2">
            <p><strong>From:</strong> {from}</p>


            {/* <p><strong>To:</strong> {to}</p> */}
            <p><strong>Subject:</strong> {subject}</p>
            <p><strong>Date:</strong> {new Date(sent_at).toLocaleString()}</p>
            <p className="whitespace-pre-wrap">{text?.length! > 10 ? text : <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: body}}></p>}</p>

          </div>
        </div>
      </dialog>
    </div>
  );
}

function MailGenerate({ email }: { email: string }) {
  return (
    <div className="flex items-start flex-col gap-4 py-10">
      <h1 className="text-2xl font-bold">Email</h1>
      <p className="text-lg">{email}</p>

      <button className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md hover:text-gray-700" onClick={() => {
        navigator.clipboard.writeText(email);
        alert('Email copied to clipboard');
      }}>
        Copy email
      </button>

      <p className="text-sm text-gray-500">
        Reload to recieve mails!
      </p>

    </div>
  );
}
