import './App.css'
import { Button, Skeleton, Stack, TextField, Typography } from '@mui/material'
import useGetTask from './service/query/useGetTask'
import useDebounce from './hooks/useDebounce'
import Card from './components/Card'
import React from 'react'
import { useSearch } from './service/query/useSearch'

function App() {

  const [page, setPage] = React.useState(1)
  const { data, isLoading } = useGetTask(page)
  const pageSize = new Array(data?.totalCount).fill(null)
  
  const [input, setInput] = React.useState('')
  const value = useDebounce(input)
  const { data: searchData } = useSearch(value)

  return (
    <div className="container mx-auto">
      <Stack position={'relative'} border={'3px solid #e5e5e5'} borderRadius={'10px'}>
        <TextField placeholder='Search ...' onChange={(e) => setInput(e.target.value)} />
        {searchData?.length ? (
          <Stack
            bgcolor={'#fff'}
            width={'99%'}
            top={'56px'}
            borderRadius={'10px'}
            p={'20px'}
            position={'absolute'}
            boxShadow={'0 0 10px 2px #000'}
          >
            {searchData.map((item) => (
              <Stack key={item.id} mb={'15px'}>
                <Typography variant='h3'>{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </Stack>
            ))}
          </Stack>
        ) : null}
      </Stack>
      {isLoading ? (
        <div>
          <Stack mb={'20px'}>
            <Skeleton sx={{ mt: '20px', mb: '20px' }} height={'72px'} />
            <Skeleton sx={{ mb: '20px' }} height={'24px'} />
          </Stack>
          <Stack mb={'20px'}>
            <Skeleton sx={{ mt: '20px', mb: '20px' }} height={'72px'} />
            <Skeleton sx={{ mb: '20px' }} height={'24px'} />
          </Stack>
        </div>
      ) : (
        data?.taskData.map((item) => <Card key={item.id} {...item} />)
      )}

      {!isLoading && (
        <Stack direction={'row'} justifyContent={'center'}>
          {pageSize?.map((_, i) => (
            <Button
              key={i}
              onClick={() => setPage(i + 1)}
              variant={'contained'}
              color={page === i + 1 ? 'error' : 'primary'}
            >
              {i + 1}
            </Button>
          ))}
        </Stack>
      )}
    </div>
  )
}

export default App
