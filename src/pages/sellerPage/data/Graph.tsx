import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, defaults} from "chart.js/auto"
import { Bar, Doughnut, Pie } from 'react-chartjs-2'
import axios from 'axios'

defaults.maintainAspectRatio = true;
defaults.responsive = true;

let ProDucts = [];
let ReQuests:any = [];
export const Graph = () => {
    const [Vehicles, setVehicles] = useState<[{name:string, id:number}]>();
    const [Products, setProducts] = useState([]);
    const [Requests, setRequests] = useState([]);
    ProDucts = Products;
    ReQuests = Requests;
    useEffect(()=>{ 
        const getAllEvtol = async ()=>{
          try{
            const response = await axios.get(`http://localhost:4000/api/v1/evtol`)
            setVehicles(response.data)
          }catch(error){
            console.log(error);
          }

        }
        getAllEvtol()
        const getAllProduct = async ()=>{
            try{
              const response = await axios.get(`http://localhost:4000/api/v1/products`)
              setProducts(response.data)
            }catch(error){
              console.log(error);
            }
  
          }
          getAllProduct()
          const makeRequest = async ()=>{
            try{
                const response = await axios.get(`http://localhost:4000/api/v1/request`)
                setRequests(response.data)
                // Data.push(response.data)
            }catch(error){
                console.log(error);
            }
        }
    
        makeRequest()
      }, [])
  return (
    <>
            <Bar 
                data={{
                    labels: Vehicles?.map((data) => data.name),
                    datasets: [
                        {
                            label: "Count",
                            data: Vehicles?.map((data)=> data.id),
                            backgroundColor: [
                                "#238ae6"
                            ],
                            borderRadius: 30,
                            barThickness: 20,
                            hoverBackgroundColor: "gainsboro",
                            hoverBorderColor: "black",
                            grouped: true,
                        },
                        
                    ],
                }}
            />
    </>
  )
}

export const PieChart = () =>{
    
    return(
        <>
        <Doughnut
             data={{
                labels: ReQuests.map((data:any)=> data.assignProducts.map((res:any)=> res.name)),
                datasets: [
                    {
                        label: "Count",
                        data: ReQuests.map((data:any)=> data.assignProducts.length),
                        backgroundColor: [
                            "#238ae6",
                            "#fa5f5f",
                            "#01b98d",
                            "#fd8018",
                            "#824ff0"
                        ],
                        barThickness: 20,
                        hoverBackgroundColor: "gainsboro",
                        hoverBorderColor: "black",
                        grouped: true,
                    },
                    
                ],
            }}
        />
        </>
    )
}