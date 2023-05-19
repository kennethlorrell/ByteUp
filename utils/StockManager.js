import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
});

const GetProductById = gql`
  query GetProductById($id: ID!) {
    cPU(where: { id: $id }) {
      id
      stock
    }
    gPU(where: { id: $id }) {
      id
      stock
    }
    motherboard(where: { id: $id }) {
      id
      stock
    }
    cooler(where: { id: $id }) {
      id
      stock
    }
    hDD(where: { id: $id }) {
      id
      stock
    }
    sSD(where: { id: $id }) {
      id
      stock
    }
    rAM(where: { id: $id }) {
      id
      stock
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: ID!, $stock: Int) {
    updateCPU(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishCPU(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateGPU(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishGPU(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateMotherboard(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishMotherboard(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateCooler(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishCooler(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateHDD(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishHDD(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateSSD(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishSSD(to: PUBLISHED, where: { id: $id }) {
      id
    }
    updateRAM(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
    publishRAM(to: PUBLISHED, where: { id: $id }) {
      id
    }
  }
`;

const StockManager = cart => {
  const checkProducts = async (theID, stockChange) => {
    const itemFromCart = await graphcms.request(GetProductById, {
      id: theID,
    });

    const productsArray = await Object.values(itemFromCart);

    productsArray.map(item => {
      if (item && item.id === theID) {
        const stock = item.stock - stockChange;
        const updateStock = graphcms.request(UpdateProductStock, {
          id: theID,
          stock: stock,
        });
      }
    });

  };

  cart &&
    cart.map((item, idx) => {
      const theID = item.id;
      const stockChange = item.numItems;
      checkProducts(theID, stockChange);
    });
};

export default StockManager;
