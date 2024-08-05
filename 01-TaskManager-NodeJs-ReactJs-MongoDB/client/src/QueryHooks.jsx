import { useQuery, useMutation, useQueryClient } from 'react-query'
import customAxios from './customAxios'
import { toast } from 'react-toastify'

export const useGetAllTasks = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allTasks'],
    queryFn: async () => {
      const { data } = await customAxios.get('/')
      return data.data
    },
  })
  return {
    isLoading,
    isError,
    data,
    error,
  }
}

export const useInsertTask = () => {
  const queryClient = useQueryClient()
  const { mutate: insertTask, data } = useMutation({
    mutationFn: async ({ title }) => {
      const { data } = await customAxios.post('/', { title })
      toast.success(data.msg)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTasks'] })
    },
  })
  return { insertTask, data }
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  const { mutate: updateTask, data } = useMutation({
    mutationFn: async ({ _id, title, isDone }) => {
      const { data } = await customAxios.patch(`/${_id}`, { title, isDone })
      toast.success(data.msg)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTasks'] })
    },
  })
  return { updateTask, data }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask } = useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await customAxios.delete(`/${_id}`)
      toast.success(data.msg)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTasks'] })
    },
  })
  return { deleteTask }
}
