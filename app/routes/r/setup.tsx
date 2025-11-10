import { CommonLayout } from "#app/components/common/common_layout.tsx";
import { Kbd } from "#app/components/common/kbd.tsx";
import { Link } from "react-router";

export default function Page() {
    return (
        <CommonLayout>
            <Setup />
        </CommonLayout>
    )
}


export function Setup() {

    // Added 'personalCare' category for items like face wash, serum, toothpaste.
    const keys = ['essentials', 'development', 'periphery', 'workspace', 'portable', 'personal care', 'others'] as const;
    type ItemWithLink = {
        name: string;
        kind: 'editor' | 'development' | 'wireless' | 'portable' | 'workspace' | "audio" | 'utility' | 'others' | (string & {});
        link?: string;
        icon?: string;
    }

    const items: Record<typeof keys[number], ItemWithLink[]> = {
        development: [
            {
                name: "Cursor Pro",
                kind: 'editor',
            },
            {
                name: ' Raspberry Pi Pico',
                kind: 'development',
            },
            {
                name: "Warp",
                kind: 'editor',
            },
            {
                name: 'ESP32',
                link: 'https://www.espressif.com/en/products/socs/esp32-c3',
                kind: 'development'
            }
        ],
        workspace: [
            {
                name: 'Ergonomic S121T',
                link: 'https://www.avinyastore.com/product/ergonomics-office-chair-s121',
                kind: 'workspace'
            },
            {
                name: "Pirka",
                kind: 'workspace',
                link: 'https://www.instagram.com/p/C2JjnddNqPc/?hl=en'
            },
            {
                name: "MAG 275QF E20 | Monitor",
                kind: 'workspace',
                link: 'https://www.msi.com/Monitor/MAG-275QF-E20'
            },

        ],
        periphery: [

            {
                name: 'Reddragon K617',
                link: 'https://www.amazon.com/Redragon-Keyboard-Mechanical-Software-Supported/dp/B09BVCVTBC',
                kind: 'workspace'
            },
            {
                name: 'Samsontech C01U Pro',
                link: 'https://samsontech.com/products/microphones/usb-microphones/c01upro/',
                kind: 'audio'
            },
            {
                name: 'GOBOULT Soniq Headphones',
                link: 'https://www.flipkart.com/goboult-soniq-70hrs-battery-40mm-drivers-dual-pairing-enc-mic-foldable-design-5-4v-bluetooth-wired/p/itmbcc6aa9fedaef?pid=ACCHCJQF3RZUYHTG&lid=LSTACCHCJQF3RZUYHTGVDJK7F&marketplace=FLIPKART&q=goboult+headphone&store=0pm%2Ffcn&srno=s_1_8&otracker=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_ps&fm=search-autosuggest&iid=63a04bc6-2821-442e-a82e-4c8b4a9bd622.ACCHCJQF3RZUYHTG.SEARCH&ppt=sp&ppn=sp&ssid=iv47o91f0rdetr0g1762791878210&qH=616a64ed8bda9b48',
                kind: 'audio'
            },
            {
                name: 'Razer Deathadder V2',
                link: 'https://www.razer.com/gaming-mice/razer-deathadder-v2-x-hyperspeed',
                kind: 'mouse'
            },


        ],
        essentials: [
            {
                name: 'Ear 2',
                link: 'https://intl.nothing.tech/products/ear-2',
                kind: 'audio'
            },
            {
                name: 'Apple Polishing Cloth',
                link: 'https://www.apple.com/in/shop/product/MW693ZM/A/polishing-cloth',
                kind: 'utility'
            }, {
                name: "Watch Pro 2",
                // link: 'https://www.apple.com/watch/pro/',
                kind: 'utility'
            },
            {
                name: "Wireless Charging Pod",
                link: "https://www.amazon.in/Vaku-Wireless-Charger-Charging-Qi-Certified/dp/B0C33K4VVR?th=1",
                kind: 'utility'
            }
        ],
        portable: [
            {
                name: 'MacBook Pro M3 18Gb 14" 512GB',
                link: 'https://www.apple.com/shop/buy-mac/macbook-pro',
                kind: 'laptop'
            },
            {
                name: "Nothing Phone 1",
                link: 'https://intl.nothing.tech/products/phone-1?colour=Black&capacity=8%2B256GB',
                kind: 'portable'
            },
            {
                name: "Poco X6 5G",
                kind: 'portable'
            }
        ],
        others: [
            {
                name: "Spigen Ultra Hybrid Phone Cover",
                link: "https://www.flipkart.com/spigen-ultra-hybrid-back-cover-nothing-phone-1/p/itm37b7af96c7029?pid=ACCGHYGPQA7FPG8S&lid=LSTACCGHYGPQA7FPG8S3POHVU&marketplace=FLIPKART&q=spigen+nothing&store=tyy&srno=s_1_8&otracker=search&otracker1=search&fm=organic&iid=6ea97bd4-9180-495a-9de1-6577c4fbc6d6.ACCGHYGPQA7FPG8S.SEARCH&ppt=hp&ppn=homepage&ssid=n3ljfmyy2o0000001730883510300&qH=26b381f6e5fda5d6"
                , kind: 'utility'
            },
            {
                name: "TVSRTR 160 4V SE | Bike",
                kind: "bike",
                link: "https://tvsnepal.com/product/apache-rtr-160-4v-se"
            }

        ],
        "personal care": [
            {
                name: "Desert Essence | Charcoal Carrageenan",
                link: "https://www.desertessence.com/products/activated-charcoal-carrageenan-free-toothpaste?srsltid=AfmBOop8iwrclIqbvBi_hlploEZg4MvMMuKpCwe4VlYZXVGLOuYIdKQz",
                kind: "toothpaste"
            },
            {
                name: "Jamun Acne | Face Serum",
                link: "https://www.jamun.in/products/jamun-acne-face-serum",
                kind: "face serum",
            },
            {
                name: "N+ Mositurizer",
                // link: "https://www.npluscosmetics.com/products/nplus-mositurizer",
                kind: "",
            },
            {
                name: "Garnier | Invisible serum Sunscreen",
                kind: "sunscreen",
            }
        ]
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                As a developer and cool guy in general, I use a lot of physical
                and digital stuff on a daily basis. These things serve many purposes.
                They bring me enjoyment, connect me to other people, and serve as tools
                that help me create software, and content. I also like to keep my body and mind healthy.
            </p>

            <div className="flex flex-col gap-4">
                {keys.map(key => (
                    <div key={key} className="flex flex-col gap-2">
                        <h2 className="text-sm font-medium text-primary capitalize">{key}</h2>
                        <ul className="flex gap-2 flex-wrap">
                            {items[key].map(item => (
                                <li key={item.name} className="flex items-center gap-3">
                                    {item.link ? <Link className="!text-sm !text-center" to={item.link} target="_blank"> <Kbd className="!text-sm !text-center px-2 py-[0.5px]">{item.name}</Kbd></Link> : <Kbd className="!text-sm !text-center px-2 py-[0.5px]">{item.name}</Kbd>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
