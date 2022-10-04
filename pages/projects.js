import Layout from "../components/layout"
import Head from "next/head"
import {TOKEN, DATABASE_ID} from "../config/index"
import ProjectItem from "../components/projects/project-item"

export default function Projects({projects}){

    return(
        <Layout>
            <div className='flex flex-col items-center justify-center min-h-screen px-3 mb-10'>
                <Head>
                    <title>JongMin Rim</title>
                    <meta name="description" content="Personal Webpage" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='grid gird-cols-1 md:grid-cols-2 p-12 m-6 gap-8'>
                    {projects.results.map((aProject) => (
                        <ProjectItem key={aProject.id} data={aProject} />
                    ))}
                </div>
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