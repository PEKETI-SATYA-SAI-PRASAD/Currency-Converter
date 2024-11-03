
const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");//gives NodeLists
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector('.msg');
let btn=document.querySelector("button");


for(let select of dropdowns){
    for(currencyCode in countryList)
    {
        //console.log(currencyCode,countryList[currencyCode]);
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        if(select.name==="from" && currencyCode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && currencyCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    //console.log(element);
    let currencyCode=element.value;
    //console.log(currencyCode);
    let countryCode=countryList[currencyCode];
    //console.log(countryCode);
    let newImgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newImgSrc;
}

const updateExchangeRate=async()=>{
    let amount=document.querySelector("input");
    let amtVal=amount.value;
    

    if(amtVal==="" || amtVal<0)
    {
        amtVal=1; 
        amount.value=1;
    }

    console.log(amtVal);
    console.log(fromCurrency.value,toCurrency.value);

    const URL=`${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let obj=data[fromCurrency.value.toLowerCase()];
    let rate=obj[`${toCurrency.value.toLowerCase()}`]


    let totalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurrency.value} =${totalAmount} ${toCurrency.value}`;
    //console.log("response=",response);
    //console.log("data=",data);
    //console.log("obj=",obj);
    //console.log("rate=",rate);
}

window.addEventListener(("click"),()=>{
     updateExchangeRate();
});

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});