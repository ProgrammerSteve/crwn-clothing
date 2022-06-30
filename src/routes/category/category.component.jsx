import{
    CategoryContainer,
    CategoryTitle,
}from './category.styles.jsx';

import { useState,useEffect,Fragment } from 'react';
import { useParams } from 'react-router';

import Spinner from '../../components/spinner/spinner.component.jsx'
import {useSelector} from 'react-redux';
import { selectCategoriesMap,selectCategoriesIsLoading } from '../../store/categories/category.selector.js';

import ProductCard from '../../components/product-card/product-card';

const Category =() =>{
    const {category}= useParams();
    const categoriesMap=useSelector(selectCategoriesMap);
    const isLoading=useSelector(selectCategoriesIsLoading);
    const [products, setProducts]=useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[categoriesMap,category])

    return(
        <Fragment>   
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>  
        {
        isLoading?<Spinner/>:
        <CategoryContainer>
            {products &&
                products.map((product)=><ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>


        }   
       
        </Fragment>

    )
}
export default Category;
