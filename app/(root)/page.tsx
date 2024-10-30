import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import { promises } from "dns";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  
  const query=(await searchParams).query

  const posts=await client.fetch(STARTUPS_QUERY);


  return (

    <>
    <section className="pink_container">
          <h1 className="heading">Pitch Your StartUp,<br /> Connect with Entrepreneurs</h1>
          <p className="sub-heading !max-w-3xl">Submit ideas,Vote on pitches, and Get Noticed in virtual competitions.
          </p>

          <SearchForm query={query}/>

    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Startups '}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length> 0 ?(
          posts.map((post:StartupCardType)=>(<StartupCard key={post?._id} post={post}/>))

        ):(<p className="no-results">No Startup Found</p>)
         }
      </ul>
    </section>
    </>

  
  );
}
