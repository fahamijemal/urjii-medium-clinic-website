import {createClient} from '@sanity/client';
export type PublicContent={_id:string;_type:string;title:string;slug:string;summary?:string;category?:string;body?:any[];professionalTitle?:string;branch?:string;references?:{label:string;url:string}[];reviewedAt?:string;author?:string;reviewer?:string};
export async function getContent(locale:string):Promise<PublicContent[]>{
 const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
 if(!projectId)return [];
 const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2026-01-01',useCdn:false,perspective:'published'});
 return client.fetch(`*[_type in ["service","staff","article","activity"] && locale==$locale && approved==true && defined(slug.current) && (_type!="staff" || consentConfirmed==true) && (_type!="article" || (defined(reviewer) && defined(reviewedAt) && count(references)>0))]{_id,_type,title,"slug":slug.current,summary,body,category,professionalTitle,branch,references,reviewedAt,author,reviewer}`,{locale});
}
