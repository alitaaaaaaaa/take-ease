"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Attributes } from "@/lib/types";
import { attributeLabels } from "@/lib/data";
export function AttributeRadar({attributes}:{attributes:Attributes}){
 const data=Object.entries(attributes).map(([key,value])=>({name:attributeLabels[key as keyof Attributes], value}));
 return <div className="h-64 w-full"><ResponsiveContainer><RadarChart data={data} outerRadius="72%"><PolarGrid stroke="#D6CFC7"/><PolarAngleAxis dataKey="name" tick={{fill:'#3A3A3A',fontSize:12}}/><Radar dataKey="value" stroke="#89A8B2" fill="#89A8B2" fillOpacity={0.34}/></RadarChart></ResponsiveContainer></div>
}
