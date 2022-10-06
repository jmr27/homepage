import Image from "next/image";

export default function ProjectItem({data}){

    const title = data.properties.Name.title[0]?.plain_text
    const github = data.properties.Github.url
    const description = data.properties.Description.rich_text[0]?.plain_text
    const imgSrc = data.cover.file?.url || data.cover.external.url
    const tag = data.properties.Tags.multi_select
    const start = data.properties.Date.date.start
    const end = data.properties.Date.date.end

    const calculatedPeriod = (start, end) => {
        const startDateStringArray = start.split('-');
        const endDateStringArray = end.split('-');

        var startDate = new Date(startDateStringArray[0], startDateStringArray[1], startDateStringArray[2]);
        var endDate = new Date(endDateStringArray[0], endDateStringArray[1], endDateStringArray[2]);

        console.log(`startDate: ${startDate}`)
        console.log(`endDate: ${endDate}`)

        const diffInMs = Math.abs(endDate - startDate);
        const result = diffInMs / (1000 * 60 * 60 * 24);

        console.log(`Period : ${result}`)
        return result;
    };

    return(
        <div className='project-card'>

            <Image 
                src = {imgSrc}
                alt = 'cover image'
                width = '100%'
                height = '60%'
                layout = 'responsive'
                objectFit = "cover"
                quality = {100}
            />

            <div className='p-4 flex flex-col'>
                <h1 className="text-2xl font-bold">{title}</h1>
                <h3 className = "mt-4 text-xl">{description}</h3>
                <a className = "py-2" href={github}>Visit Github</a>
                <div className='flex items-start mt-1'>
                    {tag.map((aTag => (
                        <h1 className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700" key={aTag.id}>{aTag.name}</h1>
                    )))}     
                </div>
            </div>
            
        </div>
    );
}