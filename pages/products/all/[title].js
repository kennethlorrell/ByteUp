import { GraphQLClient, gql } from 'graphql-request';
import styled from 'styled-components';
import MenuList from '../../../components/menulist/MenuList';
import ProductCard from '../../../components/ProductCard';
import TopBar from '../../../components/productSection/TopBar';
import Link from 'next/link';
import Head from 'next/head';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const AllProductsStyle = styled.div`
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
    .productCarsLayout {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
`;

const Title = ({ data }) => {

  const titleKey = Object.keys(data).toString();

  const topBarTitle =
    titleKey.charAt(0).toUpperCase() + titleKey.slice(1).replace('_', ' ');

  if (data) {
    const productsArray = Object.values(data)[0];

    return <>
      <Head>
        <title>{topBarTitle}</title>
      </Head>
      <AllProductsStyle>
        <div className="menu">
          <MenuList />
        </div>
        <div className="mainProductSection">
          <TopBar title={topBarTitle} />
          <div className="productCarsLayout">
            {productsArray.map(item => {
              return (
                (<Link href={`/products/${item.slug}`} key={item.id}>

                  <ProductCard item={item} />

                </Link>)
              );
            })}
          </div>
        </div>
      </AllProductsStyle>
    </>;
  }
};

export default Title;

export async function getServerSideProps(context) {
  const theSlug = context.params.title;

  const query = gql`
    {
      ${theSlug} {
        id
        price
        promotion
        onDiscount
        newProduct
        discount
        slug
        stock
        title
        images {
          url
        }
      }
    }
  `;
  const data = await graphcms.request(query);

  return {
    props: {
      data: data,
    },
  };
}
