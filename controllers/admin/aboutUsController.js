const catchAsync = require('../../utils/catchAsync');
const { Aboutus,Categories,Subcategories,Products,Servicecategory,Services} = require('../../models');
const {  writeFile, writeFileSync } = require('fs');
exports.getAboutus = catchAsync(async(req, res) => {
    const data = await Aboutus.findOne();
    return res.status(200).send(data);
});
exports.editAboutus = catchAsync(async(req, res) => {
 const data = await Aboutus.findOne();
 await data.update(req.body)
 return res.status(200).send(data);
});
exports.sitemapXml=catchAsync(async(req,res,next)=>{
    let xmlString='<?xml version="1.0" encoding="UTF-8"?>\n <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xmlString+=`<url>\n<loc>https://ebs.com.tm/</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.8</priority>\n</url>`
    xmlString+=`<url>\n<loc>https://ebs.com.tm/aboutUs</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.8</priority>\n</url>`
    xmlString+=`<url>\n<loc>https://ebs.com.tm/contact</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.8</priority>\n</url>`
    xmlString+=`<url>\n<loc>https://ebs.com.tm/news</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.8</priority>\n</url>`
    const categories=await Categories.findAll()
    for(const category of categories){
        xmlString+=`<url>\n<loc>https://ebs.com.tm/category/${category.id}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.0</priority>\n</url>`
    }
    const subcategories=await Subcategories.findAll()
    for(const subcategory of subcategories){
        xmlString+=`<url>\n<loc>https://ebs.com.tm/category/${subcategory.id}?sub=true</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.0</priority>\n</url>`   
    }
    const products=await Products.findAll()
    for(const product of products){
        xmlString+=`<url>\n<loc>https://ebs.com.tm/product/${product.id}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.0</priority>\n</url>`
    }
    const servicecategories=await Servicecategory.findAll()
    for (const service_category of servicecategories){
        xmlString+=`<url>\n<loc>https://ebs.com.tm/service-category/${service_category.id}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.0</priority>\n</url>`
    }
    const services=await Services.findAll()
    for(const service of services){
        xmlString+=`<url>\n<loc>https://ebs.com.tm/service/${service.id}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>1.0</priority>\n</url>`
    }
    xmlString+='</urlset>'

    // const text=JSON.stringify(sitemap)
    writeFileSync("sitemap.xml",xmlString)
    return res.sendFile("sitemap.xml",{root:"./"})
    // return res.send(xmlString)
})
