import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/link/page',
    method: 'get',
    params: params
  })
}

export function saveLink(params) {
  return request({
    url: '/admin/link',
    method: 'post',
    data: params,
  })
}

export function updateLink(params) {
  return request({
    url: '/admin/link',
    method: 'put',
    data: params,
  })
}

export function deleteLink(id) {
  return request({
    url: '/admin/link/' + id,
    method: 'delete',
  })
}

