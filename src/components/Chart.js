"use client";

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({data}) {
  const xlabel=Object.keys(data[0]).find(keys => keys !=='date')
  const datewithoutgaps = [];
  data.forEach((value, index) => {
    const date = value.date;
    datewithoutgaps.push({
      date,
      [xlabel]:value?.[xlabel]||0,
    })
    const nexDate = data?.[index + 1]?.date;
    if (date && nexDate) {
      const daysbetween = differenceInDays(parseISO(nexDate),parseISO(date));
      if (daysbetween > 0) {
        for (let i = 1; i < daysbetween; i++) {
          const dateBetween=formatISO9075(addDays(parseISO(date),i)).split(' ')[0]
  
          datewithoutgaps.push(
            {
              date:dateBetween,
              [xlabel]:0
            })
        }
      }
    }
  });
  return (
    <div className="">
      <ResponsiveContainer width="100%" height={200}>

      <LineChart
        width={730}
        height={250}
        data={datewithoutgaps}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
        <CartesianGrid horizontal={false} strokeWidth={2} stroke="#f5f5f5f5"  strokeDasharray="3 3" />
        <XAxis axisLine={false} tickLine={false} tickMargin={10} tick={{fill:'#aaaa'}} dataKey="date" />
        <YAxis axisLine={false} tickMargin={10} tickLine={false} tick={{fill:'#aaaa'}} />
        <Tooltip />
        <Line type="monotone" dataKey={xlabel} stroke="#09f" strokeWidth={4} />
      </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
