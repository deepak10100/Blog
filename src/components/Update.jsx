
import { Button, Container, FormControl, FormLabel, HStack, Heading,  Input, Spinner, Textarea, VStack } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBlogQuery, useEditBlogMutation } from "../redux/blogApi"
import { useEffect, useState } from "react"

const Update = () => {
    let {id} = useParams()
    let navigate = useNavigate()
    let [blog, setBlog] = useState({
        title:'',
        desc:'',
        imagePath:''
    })
    let [editData, {isLoading: isUpdating, error}] = useEditBlogMutation()
    let {data} = useBlogQuery(id)
    console.log(data)
    useEffect(()=>{
        if(data){
            setBlog((prev) => ({ ...prev, title: data.title, desc: data.desc, imagePath: data.imagePath }));
        }

    },[data])
    let onchangeHandler=(e)=>{
        setBlog({...blog,[e.target.name]:e.target.value})
        console.log(blog)
    
      }
      let onchangeFileHandler =(e)=>{
        setBlog({...blog,[e.target.name]:e.target.files[0]})
        console.log(blog)
      }
        let submitHandler = async (e)=>{
            e.preventDefault()
           
            
            // if(blog.imagePath && blog.title && blog.desc){
                let formData = new FormData()
                formData.append('title',blog.title)
                formData.append('desc',blog.desc)
             
             if (blog.imagePath) {
                formData.append('imagePath',blog.imagePath)
              }
            
            try {
                let a = await editData({id,formData}) 
                console.log(a)
              
                navigate('/')
              } catch (error) {
                console.error('Update failed:', error);
              }
            // }else{
                // alert("all fiedl lkdsjf")
            // }
            
          
         
           
        }
        if (isUpdating) return <Spinner />;
  if (error) return <p>Error loading blog data</p>;

    
  return (
    <>
          <Container maxW={'container.md'}>
    <VStack>
        <Heading>Blog Update</Heading>
    </VStack>
        <form action="" onSubmit={submitHandler}>
        <VStack gap={4} >
        <FormControl>
            <FormLabel>
                Title
            </FormLabel>
            <Input name="title" value={blog.title}  placeholder="Enter the title" onChange={onchangeHandler} />
        </FormControl>
        <FormControl>
            <FormLabel>
                Describation
            </FormLabel>
            <Textarea name="desc" value={blog.desc}  placeholder="Enter the describation" onChange={onchangeHandler} />
        </FormControl>
        <FormControl>
            <FormLabel>
                Blog Image
            </FormLabel>
            <Input name="imagePath" onChange={onchangeFileHandler} type="file" accept="image/*" p={1}  placeholder="Enter the describation" />
        </FormControl>
        <Button w={'sm'} type="submit" >Update Blog</Button>
    </VStack>
        </form>
    </Container>
    </>
  )
}

export default Update
