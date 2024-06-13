import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, ButtonGroup, Card, CardBody, CardFooter, Container, Divider, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, Spinner, Text, Textarea, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useAddBlogMutation, useDeleteBlogMutation, useGetBlogsQuery } from "../redux/blogApi"
import { useState } from "react"


function Home() {
    let {data, error, isLoading} = useGetBlogsQuery()
    let [deleteBlog] =useDeleteBlogMutation()
    let [blog,setBlog] = useState()
    let [addBlog] =useAddBlogMutation()
    
    if(isLoading){
        return <>
        <VStack>
            <Spinner size={'xl'}/>
        </VStack>
        </>
    }
    if(error){
        return <h1>{error.message}</h1>
    }
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
       
        
        if(blog.imagePath && blog.title && blog.desc){
            let formData = new FormData()
            formData.append('title',blog.title)
            formData.append('desc',blog.desc)
         formData.append('imagePath',blog.imagePath)
         let a = await addBlog(formData) 
        console.log(a)
        document.querySelector('form').reset()
        }else{
            alert("all fiedl lkdsjf")
        }
        
      
     
       
          

    }
  return (
    <>
    <Container maxW={'container.md'}>
    <VStack>
        <Heading>Blog App</Heading>
    </VStack>
        <form onSubmit={submitHandler}>
    <VStack gap={4} >
        <FormControl>
            <FormLabel>
                Title
            </FormLabel>
            <Input name="title" placeholder="Enter the title" onChange={onchangeHandler} />
        </FormControl>
        <FormControl>
            <FormLabel>
                Describation
            </FormLabel>
            <Textarea name="desc" placeholder="Enter the describation" onChange={onchangeHandler} />
        </FormControl>
        <FormControl>
            <FormLabel>
                Blog Image
            </FormLabel>
            <Input name="imagePath" onChange={onchangeFileHandler} type="file" accept="image/*" p={1}  placeholder="Enter the describation" />
        </FormControl>
        <Button w={'full'} type="submit" >Add Blog</Button>
    </VStack>
        </form>
    </Container>
    <Container maxW={'container.xl'} py={5} >
        
        <Grid templateColumns="repeat(auto-fit, minmax(20rem, 1fr))"  gap={4}>
           {
            data.map((blog)=>(
                <GridItem key={blog._id}  >
                <Card>
                    <CardBody>
                       <Image src={`https://mern-backend-api-6y85.onrender.com/public${blog.imagePath}`}/>
                        <Heading>{blog.title}</Heading>
                        <Text>{blog.desc}</Text>
                        <Text mt={4}> Created By: {new Date(blog.date).toLocaleDateString()}</Text>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                       <ButtonGroup>
                       <Link to={`blog/${blog._id}`}>
                       <Button>Read More</Button>
                       </Link>
                      <Link to={`/editblog/${blog._id}`}>
                      <Button>Edit</Button>
                      </Link>
                        
                        <Button onClick={()=> deleteBlog(blog._id)} >Delete</Button>
                      
                        
                       </ButtonGroup>

                    </CardFooter>
                </Card>
            </GridItem>
            ))
           }

        </Grid>
       

    </Container>
    </>
  )
}

export default Home
