import styles from "./login_components/style";


import { footerLinks, socialMedia } from "./constants";
import Head from 'next/head'
import Image from 'next/image'

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row items-center justify-center md:justify-start md:items-start flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start items-center text-center md:items-start md:text-start mr-0 lg:mr-10">
        <div
          className="w-[266px] h-[72.14px] object-contain text-white mt-4 md:mt-0 text-4xl lg:text-5xl"
        >De<span className="text-[#60e0e6]">ction</span></div>
        <p className={`${styles.paragraph} text-center mt-4 max-w-[312px]`}>
          A new way to make the elections easy, reliable and secure.
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 ">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-white/75 hover:text-secondary cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[14px] lg:text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2022 Dection. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6 md:mb-0 mb-6">
        {socialMedia.map((social, index) => (
          <Image
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`lg:w-[21px] w-[17px] h-[17px] lg:h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
