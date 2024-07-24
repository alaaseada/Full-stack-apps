import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import customAxios from './customeAxios'
import { toast } from 'react-toastify'

export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customAxios.get('/')
      return data.data.taskList
    },
  })
  return { isLoading, isError, data }
}

export const useAddTask = () => {
  const queryClient = useQueryClient()
  const { mutate: addTask } = useMutation({
    mutationFn: async (formData) => {
      return customAxios.post('/', Object.fromEntries(formData))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (err) => {
      toast.error(err)
    },
  })
  return { addTask }
}

export const useEditTask = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: async ({ id, isDone }) => {
      return customAxios.patch(`/${id}`, { isDone })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (err) => {
      toast.error(err)
    },
  })
  return { editTask }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask } = useMutation({
    mutationFn: async ({ id }) => {
      return customAxios.delete(`/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Item deleted')
    },
  })
  return { deleteTask }
}
