import{
    CategoryContainer,
    CategoryTitle,
}from './category.styles.jsx';

import { useState,useEffect,Fragment } from 'react';
import { useParams } from 'react-router';


import {useSelector} from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector.js';

import ProductCard from '../../components/product-card/product-card';

const Category =() =>{
    const {category}= useParams();
    const categoriesMap=useSelector(selectCategoriesMap);
    const [products, setProducts]=useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[categoriesMap,category])

    return(
        <Fragment>   
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>     
        <CategoryContainer>
            {products &&
                products.map((product)=><ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>
        </Fragment>

    )
}
export default Category;