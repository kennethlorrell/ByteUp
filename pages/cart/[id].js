import { GraphQLClient, gql } from 'graphql-request';
import { RichText } from '@graphcms/rich-text-react-renderer';
import styled from 'styled-components';
import MenuList from '../../components/menulist/MenuList';
import TopBar from '../../components/productSection/TopBar';
import useGetItemDetails from '../../utils/useGetItemDetails';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useProductContext } from '../../state/context/productContext';
import Head from 'next/head';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const ProductStyle = styled.div`
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .productSection {
    width: 100%;

    .productInfo {
      display: flex;
      gap: 2rem;
      padding: 2% 3%;
      .text-bold {
        font-weight: bold;
      }
      .text-italic {
        font-style: italic;
      }

      .productDetails {
        padding: 0 1rem;

        .subtitle {
          text-align: center;
          padding-bottom: 0.2rem;
          h3 {
            background-color: #e9edf2;
            border: solid 1px #c3ced9;
            padding: 0.3rem 0.4rem;
            border-radius: 4px;
          }
        }
        .productDescriptionTitle {
          text-align: left;
          p {
            font-size: 1.05rem;
            font-weight: bold;
          }
        }

        .allDescription {
          margin: 5%;
        }
        .productInfoLink {
          color: #4d71c6;
          text-decoration: underline;
        }
      }
      .productPreview {
        padding: 0 1rem;
        .previewWrapper {
          text-align: center;
          .promoBanner {
            position: absolute;
            transform: translate(+20%, +40%);
            z-index: 100;
            width: 8vw;
          }
        }
      }
      .prices {
        font-size: 1.1rem;
        p {
          margin: 0.7rem;
        }

        .fadedPrice {
          color: #7c90a6;
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .newProduct {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .promoPrice {
          span {
            color: #cc194c;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .price {
          span {
            font-size: 1.2rem;
            font-weight: 600;
          }
        }
        .warranty {
          span {
            font-weight: 600;
            font-size: 1.2rem;
          }
        }
      }
      .btn {
        padding-top: 0.7rem;
        button {
          display: flex;
          align-items: center;
          margin: auto;
          padding: 0.5rem 2.2rem;
          .cartIconWrap {
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .productInfo {
      display: flex;
      flex-flow: column;
    }
    .productPreview {
      order: 1;
    }
    .productDetails {
      order: 2;
    }
  }
`;

const ProductByID = ({ product }) => {
  const { addToCart } = useProductContext();

  const productArray = Object.values(product);

  let item = {};
  productArray.map(items => {
    items.map(i => {
      item = i;
    });
  });

  const {
    isNewProd,
    isPromoProd,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgsrc,
    mainImgSrc,
    id,
    title,
    subtitle,
    stock,
    numItems,
    mainContent,
    manufacturer,
    warranty,
  } = useGetItemDetails(item);

  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={`${title} details`} />
    </Head>
    <ProductStyle>
      <div className="menuSection">
        <MenuList />
      </div>
      <div className="productSection">
        <div className="productTitle">
          <TopBar title={title} />
        </div>
        <div className="productInfo">
          <div className="productDetails">
            <div className="product">
              <div className="subtitle">
                <h3>{subtitle}</h3>
              </div>
              <div className="allDescription">
                <div className="productDescriptionTitle">
                  <p>Характеристики товару:</p>
                </div>
                <div className="productDescription">
                  <RichText
                    content={mainContent}
                    renderers={{
                      h1: ({ children }) => (
                        <h1 className="text-normal">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-normal">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-normal">{children}</h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-normal">{children}</h4>
                      ),
                      p: ({ children }) => (
                        <p className="text-normal">{children}</p>
                      ),
                      bold: ({ children }) => (
                        <strong className="text-bold">{children}</strong>
                      ),
                      italic: ({ children }) => (
                        <span className="text-italic">{children}</span>
                      ),
                    }}
                  />
                  <a className="productInfoLink" href={manufacturer}>
                    Більше інформації про товар:
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="productPreview">
            <div className="previewWrapper">
              <div className="ImageWrapper">
                <div className="promoBanner">
                  <Image
                    src={imgsrc}
                    height={90}
                    width={145}
                    alt="promo-new-product"
                  />
                </div>
                <Image
                  src={mainImgSrc}
                  height={478}
                  width={478}
                  alt={title}
                />
              </div>
              <div className="priceSection">
                <div className="prices">
                  {isPromoProd ? (
                    <div>
                      <p className="fadedPrice">
                        Ціна: {price}₴ <span>ЗНИЖКА {discount}%</span>
                      </p>
                      <p className="promoPrice">
                        Спеціальна пропозиція: <span>{discountPrice}₴</span>
                      </p>
                    </div>
                  ) : isNewProd ? (
                    <div>
                      <p className="newProduct">
                        <span>НОВИНКА</span>
                      </p>
                      <p className="price">Ціна {price}₴</p>
                    </div>
                  ) : (
                    <div>
                      <p className="regularProduct">Звичайний товар</p>
                      <p className="price">Ціна {price}₴</p>
                    </div>
                  )}
                  <p className="warranty">
                    Гарантія: <span>{warranty > 0 ? `${warranty} днів` : 'відсутня'}</span>
                  </p>
                </div>
              </div>

              <div className={`btn ${stock < 1 && 'outOfStock'} `}>
                <Link href={`${stock > 0 ? '/cart' : '#'}`} passHref legacyBehavior>
                  <button
                    onClick={() =>
                      stock > 0
                        ? addToCart(
                            id,
                            title,
                            stock,
                            price,
                            discount,
                            mainImgSrc,
                            numItems
                          )
                        : ''
                    }
                  >
                    {stock > 0 ? 'Додати у кошик' : 'Товар закінчився'}
                    <div className="cartIconWrap">
                      <Image
                        src="/cartIcon-white.svg"
                        height={18}
                        width={18}
                        alt="cartIcon"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductStyle>
  </>;
};

export default ProductByID;

export async function getServerSideProps(context) {
  const currentSlug = context.params.id;
  console.log('currentSlug e---', currentSlug);

  const query = gql`
    query ($currentSlug: ID!) {
      cPUs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      gPUs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      motherboards(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      coolers(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      hDDs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      sSDs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }
      rAMs(where: { id: $currentSlug }) {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        subtitle
        images {
          url
        }
        brand
        description {
          raw
        }
        manufacturerLink
        manufacturer
        warranty
      }                  
    }
  `;

  const variables = { currentSlug };
  const product = await graphcms.request(query, variables);

  return {
    props: {
      product: product,
    },
  };
}
