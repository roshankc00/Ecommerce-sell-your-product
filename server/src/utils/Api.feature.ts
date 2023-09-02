import { Product } from "../Product/product.model";

class ApiFeatures{
    constructor(private  query:any,private  queryStr:any){
        this.query=query
        this.queryStr=queryStr
        
    }

    return_query(){
        return this.query
    }
    search(){
        const keyword=this.queryStr.keyword ?{
            title:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }:{}
        this.query=this.query.find({...keyword});
        return this
    }


    filter(){
        const queryCopy={...this.queryStr}

        const removeFields=['keyword','page','limit','sort_by_ratings','sort_by_oldest']
        removeFields.forEach((key)=>delete queryCopy[key])

        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|eq|ne|in)\b/g,match=>`$${match}`)
        this.query=this.query.find(JSON.parse(queryStr))
        return this
    }


    pagination(resultperPage:number){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultperPage*(currentPage-1);
        this.query=this.query.limit(resultperPage).skip(skip);
        return this
    }

}

export default ApiFeatures