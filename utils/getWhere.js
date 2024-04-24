const {Op}=require("sequelize")
exports.getWhere=({min,max,sizes,category,colors,subcategoryId})=>{
    console.log(sizes,colors)
 let where = []
    if (max && min == "") {
        let price = {
            [Op.lte]: max
        }
        
        where.push({ price })
    } else if (max == "" && min) {
        let price = {
            [Op.gte]: min
        }
        where.push({ price })
        
    } else if (max && min) {
        let price = {
            [Op.and]: [{
                price: {
                    [Op.gte]: min
                }
            },
            {
                price: {
                    [Op.lte]: max
                }
                }
            ],
        }
        where.push(price)
    }
    if(sizes && sizes.length>0){
        let array=[]
        for (let i=0;i<sizes.length;i++){
            array.push({sizeIds:{[Op.contains]:[sizes[i]]}})
        }
        let opor={[Op.or]:array}
        where.push(opor)
    }
    if(category&&category.length!=0){
        where.push({categoryId: {
            [Op.in]: category
        }
    })
}
if(colors&&colors.length!=0){
    let array=[]
    for (let i=0;i<colors.length;i++){
        array.push({colorIds:{[Op.contains]:[colors[i]]}})
    }
    let opor={[Op.or]:array}
    where.push(opor)
}
    if(subcategoryId&&subcategoryId!="undefined"){
        where.push({subcategoryId})
    }
console.log(where)
return where
}