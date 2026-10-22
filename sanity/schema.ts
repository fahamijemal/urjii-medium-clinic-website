import {defineType,defineField, type FieldDefinition} from 'sanity';
const locale=defineField({name:'locale',type:'string',options:{list:[{title:'Afaan Oromoo',value:'om'},{title:'English',value:'en'},{title:'አማርኛ',value:'am'}]},validation:r=>r.required()});
const common:FieldDefinition[]=[
 defineField({name:'title',type:'string',validation:r=>r.required()}),
 defineField({name:'slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),locale,
 defineField({name:'approved',title:'Facts, language and consent reviewed',type:'boolean',initialValue:false}),
 defineField({name:'summary',type:'text'}),
 defineField({name:'body',type:'array',of:[{type:'block'}]}),
 defineField({name:'image',type:'image',fields:[{name:'alt',type:'string',validation:r=>r.required()}]}),
 defineField({name:'seoDescription',type:'text'})
];
const articleFields:FieldDefinition[]=[
 defineField({name:'author',type:'string',validation:r=>r.required()}),
 defineField({name:'reviewer',title:'Qualified medical reviewer',type:'string',validation:r=>r.required()}),
 defineField({name:'reviewedAt',type:'date',validation:r=>r.required()}),
 defineField({name:'category',type:'string'}),
 defineField({name:'references',type:'array',validation:r=>r.required().min(1),of:[{type:'object',fields:[{name:'label',type:'string',validation:r=>r.required()},{name:'url',type:'url',validation:r=>r.required().uri({scheme:['https']})}]}]})
];
const staffFields:FieldDefinition[]=[
 defineField({name:'professionalTitle',type:'string'}),
 defineField({name:'consentConfirmed',type:'boolean',validation:r=>r.custom(v=>v===true?true:'Consent is required.')}),
 defineField({name:'branch',type:'string',options:{list:['qollo-sirrii','yabelloo','both']}})
];
export const schemaTypes=[
 ...['service','staff','article','activity'].map(name=>defineType({name,type:'document',fields:[...common,...(name==='article'?articleFields:[]),...(name==='staff'?staffFields:[])]})),
 ...['siteSettings','clinic','founder','branch','category','gallery','faq','socialLink','legalPage'].map(name=>defineType({name,type:'document',fields:[defineField({name:'title',type:'string',validation:r=>r.required()}),locale,defineField({name:'content',type:'array',of:[{type:'block'}]}),defineField({name:'verified',type:'boolean',initialValue:false})]}))
];
