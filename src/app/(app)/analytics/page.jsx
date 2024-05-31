import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import Sections from "@/components/layout/SectionBox";
import Event from "@/models/Event";
import Page from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInDays, formatISO9075, isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Analytics() {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authoptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session?.user?.email });
  let groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: page?.uri,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d",
            },
          },
          count: {
            $count: {},
          },
        },
      },
      {
        $sort:{_id:1}
      }
    ]
  );

  const clicks=await Event.find(
    {
      page:page.uri,
      type:"click"
    }
  )

  return (
    <div>
      <Sections>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </Sections>
      <Sections>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link,index) => {
          return (
            <div key={index} className="flex items-center gap-6 border-t border-gray-200 py-4">
              <div className="text-blue-500 pl-4">
                <FontAwesomeIcon icon={faLink}/>
              </div>
              <div className="grow">
                <h2>{link.title || "no title"}</h2>

                <p className="">{link.subtitle || "no description"}</p>
                <a href="link.url" target="_blank" className="text-xs text-blue-500">{link.url}</a>
              </div>
              <div className="">
                Today:{clicks.filter(c=>c.uri===link.url && isToday(c.createdAt)).length}<br/>
                All-Time:{clicks.filter(c=>c.uri===link.url).length}
              </div>
            </div>
          );
        })}
      </Sections>
    </div>
  );
}
