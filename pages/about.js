import Layout from "../components/layout"
import Head from "next/head"
import Interest from "../components/about/interest"

export default function About(){

    return(
        <Layout>
            <Head>
                <title>JongMin Rim</title>
                <meta name="description" content="Personal Webpage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex flex-col items-center justify-center px-3 mb-10'>
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900">About</h1>
                <Interest />
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
          Authorization: `Bearer secret_2hf2WI8BcaSEQdUC14waLdrmF81MXC6P929SsBndshA`
        },
        body: JSON.stringify({
            page_size: 100
        })
      };

    const res = await fetch(`https://api.notion.com/v1/databases/26e51ecad6f14bf5ac0e1908b32b082e/query`, options)

    const projects = await res.json()
    
    const projectNames = projects.results.map((aProject) =>(
        aProject.properties.Name.title[0]?.plain_text
    ))

    return {
        props: {projects}, // will be passed to the page component as props
    }
}