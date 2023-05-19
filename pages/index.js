import { GraphQLClient, gql } from 'graphql-request';
import TopBar from '../components/productSection/TopBar';
import styled from 'styled-components';
import MenuList from '../components/menulist/MenuList';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import FetchUsers from '../utils/FetchUsers';
import Head from 'next/head';

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const HomeStyle = styled.div`
  display: flex;
  gap: 5%;
  padding: 0 10%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }

  .mainProductSection {
    width: 100%;
    .productCardsLayout {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-around;
    }
  }
`;

const Home = ({ data }) => {
  console.log(data);

  FetchUsers();
  const topBarTitle = 'Нові і рекомендовані товари';
  const productsArray = Object.values(data);

  let myItems = [];

  productsArray.map(items => {
    items.map(item => {
      myItems.push(item);
    });
  });

  return <>
    <Head>
      <title>ByteUp</title>
      <meta name="description" content="ByteUp - магазин комп’ютерної техніки" />
    </Head>
    <HomeStyle>
      <div className="menu">
        <MenuList />
      </div>
      <div className="mainProductSection">
        <TopBar title={topBarTitle} />
        <div className="productCardsLayout">
          {myItems.map(item => {
            return (
              (<Link href={`/products/${item.slug}`} key={item.id}>

                <ProductCard item={item} />

              </Link>)
            );
          })}
        </div>
      </div>
    </HomeStyle>
  </>;
};

export default Home;

const MyQuery = gql`
  {
    cPUs(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    gPUs(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    motherboards(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    coolers(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    hDDs(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    sSDs(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }
    rAMs(where: { OR: [{ newProduct: true }, { promotion: true }] }) {
      id
      discount
      images {
        url
      }
      newProduct
      onDiscount
      price
      promotion
      slug
      title
      subtitle
      stock
    }                
  }
`;

export async function getServerSideProps() {
  const data = await graphcms.request(MyQuery);

  return {
    props: {
      data: data,
    },
  };
}
