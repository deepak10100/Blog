import { Button, Container, Divider, Heading, Image, Spinner, Stack, Text, VStack } from '@chakra-ui/react'

import { Link, useParams } from 'react-router-dom'
import { useBlogQuery } from '../redux/blogApi'

function Blogview() {
  let {id}  = useParams()
  let { data, isLoading, error, isSuccess } = useBlogQuery(id)
  console.log(data)
  if(isLoading) return <>
  <VStack>
    <Spinner size="xl" />
  </VStack>
  </>
  if(error) return <h1>{error.message}</h1>
  if(!isSuccess) return <h1>{isSuccess.message}</h1>

  return (
    <>
      <Container maxW={'container.xl'} p={5}>
     {
     
        <VStack spacing={7}>
      <Image h={['sm',"lg"]} src={`https://mern-backend-api-6y85.onrender.com/public${data.imagePath}`} />
        <Stack>
          <Heading>{data.title}</Heading>
          <Text> {data.desc}</Text>
        </Stack>
        <Divider/>
        <Link to={'/'}>
        <Button width={'md'}>Back</Button>
        </Link>
      </VStack>
      
     }
      </Container>
    </>
  )
}

export default Blogview
