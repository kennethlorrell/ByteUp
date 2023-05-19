import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import MenuList from '../../components/menulist/MenuList';
import TopBar from '../../components/productSection/TopBar';
import Head from 'next/head';

const ContactStyle = styled.div`
  display: flex;
  padding: 0 10%;
  gap: 5%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .mainContactSection {
    width: 100%;
    .contactSection {
      padding: 0;
      padding: 0 10%;
      display: flex;
      flex-direction: column;
      @media (max-width: 1600px) {
        padding: 0 5%;
      }
      @media (max-width: 1440px) {
        padding: 0 3%;
      }
      @media (max-width: 1280px) {
        padding: 0;
      }

      .sectionTitle {
        text-align: center;
        h3 {
          font-size: 1.25rem;
          letter-spacing: 0.05rem;
        }
      }
    }

    .infoSection {
      flex: 5;
      .infoCard {
        background-color: #e9edf2;
        border: solid 1px #c3ced9;
        border-radius: 4px;
        padding: 0 1rem;
        margin: 1.5rem 0.5rem;
        h4 {
          color: #3f6795;
          margin: 1.23rem 0;
        }
        span {
          color: #7c90a6;
        }
        hr {
          border: 0;
          height: 1px;
          background: #c3ced9;
        }
        .cardHeadline {
          text-align: center;
          margin: 0.8rem 0;
        }
      }
    }

    .mapSection {
      padding: 0 5%;
      margin-bottom: 3rem;
      @media (max-width: 1024px) {
        padding: 0 1%;
      }
      .map {
        overflow: hidden;
        padding-bottom: 60%;
        position: relative;
        height: 0;
      }

      .map iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
      }
    }

    .formAndInfo {
      display: flex;
      padding: 0 4%;
      gap: 9%;
      margin-bottom: 2rem;

      @media (max-width: 1024px) {
        padding: 0;
      }
      @media (max-width: 590px) {
        flex-direction: column;
      }

      .formWrap {
        flex: 8;
        padding: 0 0.5rem;
        .theForm {
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .sentSpan {
            color: #19a695;
            margin-left: 0.5rem;
          }
          label {
            display: block;
            margin-bottom: 0.2em;
            margin-left: 0.5rem;
          }

          p {
            width: 100%;
            margin-bottom: 0;
            :first-of-type {
              margin-top: 0;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus,
            select:-webkit-autofill,
            select:-webkit-autofill:hover,
            select:-webkit-autofill:focus {
              -webkit-text-fill-color: #3f6795;
              transition: background-color 5000s ease-in-out 0s;
            }

            input,
            textarea {
              color: #3f6795;
              background-color: #e9edf2;
              width: 100%;
              border-radius: 4px;
              border: solid 1px #c3ced9;
              letter-spacing: 0.04rem;

              :focus {
                outline: none !important;
                border: 1px solid #7c90a6;
                box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -webkit-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -moz-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
              }
            }

            input {
              height: 2rem;
            }
          }

          .btn {
            margin: 0.75rem 0 1rem 0;
            align-self: flex-start;
            button {
              padding: 0.6rem 1.5rem;
              letter-spacing: 0.15rem;
            }
          }
        }
      }
    }
  }
`;

const ContactPage = () => {
  const topBarTitle = 'Контакти';

  //---------------------------
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_USER_ID
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        },
        e.target.reset(),
        setSent(true),
        setTimeout(() => {
          setSent(false);
        }, 4000)
      );
  };
  //---------------------------
  return (
    <>
      <Head>
        <title>Контакти</title>
        <meta name="description" content="contact form" />
      </Head>
      <ContactStyle>
        <MenuList />
        <div className="mainContactSection">
          <TopBar title={topBarTitle} />

          <div className="contactSection">
            <div className="sectionTitle">
              <h3>Залишились питання? Зв’яжіться з нами!</h3>
            </div>
            <div className="formAndInfo">
              <div className="formWrap">
                <form ref={form} onSubmit={sendEmail} className="theForm">
                  <p>
                    <label>Ваше ім’я</label>
                    <input type="text" name="name" minLength="3" required />
                  </p>
                  <p>
                    <label>Електронна пошта</label>
                    <input type="email" name="email" minLength="7" required />
                  </p>
                  <p>
                    <label>Тема</label>
                    <input
                      type="text"
                      name="subject"
                      minLength="2"
                      maxLength="35"
                      required
                    />
                  </p>
                  <p>
                    <label>Введіть повідомлення</label>
                    <textarea
                      name="message"
                      minLength="5"
                      maxLength="200"
                      required
                      rows="7"
                      cols="40"
                    />
                  </p>
                  <div className="btn">
                    <button>Відправити</button>
                    {sent && <span className="sentSpan">Повідомлення успішно надіслано!</span>}
                  </div>
                </form>
              </div>
            </div>
            <div className="mapSection">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.492206915509!2d30.52069452687138!3d50.45055843735559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0JzQsNC50LTQsNC9INCd0LXQt9Cw0LvQtdC20L3QvtGB0YLRliwg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1684457818405!5m2!1suk!2sua"
                  width="600"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </ContactStyle>
    </>
  );
};

export default ContactPage;
