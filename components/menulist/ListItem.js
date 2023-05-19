import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledItem = styled.div`
  .menuSubmenu {
    display: flex;
    flex-direction: column;
  }
  .subItemDiv {
    position: absolute;
    width: 15rem;
    margin-left: 14.5rem;
    z-index: 200;
  }
`;

const ListItem = props => {

  const { itemTitle, uniqueBrands, rawTitle } = props;
  const [brands, setBrands] = useState('');

  const handleOnMouseOver = () => {
    uniqueBrands.length > 1 ? setBrands(uniqueBrands) : '';
  };

  const handleOnMouseLive = () => {
    brands && setBrands('');
  };
  return (
    <StyledItem
      onMouseOver={() => {
        handleOnMouseOver();
      }}
      onMouseLeave={() => {
        handleOnMouseLive();
      }}
    >
      <div className="menuSubmenu">
        <div className="noBrandItem">
          <Link href={`/products/all/${rawTitle}`} legacyBehavior>
            <p>{itemTitle}</p>
          </Link>
        </div>
        <div className="subItemDiv">
          {brands &&
            brands.map((brand, idx) => {
              return (
                <div key={idx}>
                  <Link href={`/products/brands/${brand}-${rawTitle}`} legacyBehavior>
                    <p>{brand}</p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </StyledItem>
  );
};

export default ListItem;
