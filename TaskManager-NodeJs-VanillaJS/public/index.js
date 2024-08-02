let baseURL = 'http://localhost:5000/api/v1/tasks'

const add_task = async (e) => {
  e.preventDefault()
  const title = e.target[0].value
  await axios.post(`${baseURL}/`, {
    title,
    isDone: false,
  })
  e.target.reset()
}

const get_all_tasks = async () => {
  const {
    data: { data },
  } = await axios.get(`${baseURL}/`)
  const task_list_div = document.querySelector('#task_list')
  task_list_div.innerHTML = ''
  const tasks_ul = document.createElement('ul')
  data.map((task) => {
    let item = document.createElement('li')
    let wrapper = document.createElement('div')
    wrapper.classList.add('item-wrapper')
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', `task-${task.id}-checkbox`)
    task.isDone == 1 && checkbox.setAttribute('checked', true)
    checkbox.addEventListener('change', (e) => {
      e.target.nextElementSibling.classList.toggle('done')
      update_task(task.id, { isDone: e.target.checked })
    })
    wrapper.appendChild(checkbox)
    let label = document.createElement('label')
    label.setAttribute('id', `task-${task.id}-label`)
    label.setAttribute('for', `task-${task.id}-checkbox`)
    if (task.isDone) label.classList.add('done')
    label.innerText = task.title
    let del_btn = document.createElement('button')
    del_btn.innerText = 'Delete'
    del_btn.classList.add('btn-del')
    del_btn.addEventListener('click', (e) => {
      e.preventDefault()
      delete_task(task.id)
    })
    let update_btn = document.createElement('button')
    update_btn.innerText = 'Update'
    update_btn.classList.add('btn-del')
    update_btn.addEventListener('click', (e) => {
      e.preventDefault()
      update_task(task.id)
    })
    wrapper.appendChild(label)
    wrapper.appendChild(del_btn)
    wrapper.appendChild(update_btn)
    item.appendChild(wrapper)
    tasks_ul.appendChild(item)
  })
  task_list_div.appendChild(tasks_ul)
}

const update_task = async (id, data) => {
  await axios.put(`${baseURL}/${id}`, { ...data })
  get_all_tasks()
}
const delete_task = async (id) => {
  await axios.delete(`${baseURL}/${id}`)
  get_all_tasks()
}

window.addEventListener('load', get_all_tasks)
