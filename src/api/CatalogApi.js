import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/catalog/page',
    method: 'get',
    params: params
  })
}

export function saveCatalog(params) {
  return request({
    url: '/admin/catalog',
    method: 'post',
    data: params,
  })
}

export function updateCatalog(params) {
  return request({
    url: '/admin/catalog',
    method: 'put',
    data: params,
  })
}

export function deleteCatalog(id) {
  return request({
    url: '/admin/catalog/' + id,
    method: 'delete',
  })
}
