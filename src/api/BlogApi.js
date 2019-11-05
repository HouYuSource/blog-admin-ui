import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/blog/page',
    method: 'get',
    params: params
  })
}

export function findCategoryList(params) {
  return request({
    url: '/catalog/list',
    method: 'get',
  })
}

export function saveBlog(params) {
  return request({
    url: '/admin/blog',
    method: 'post',
    data: params,
  })
}

export function updateBlog(params) {
  return request({
    url: '/admin/blog',
    method: 'put',
    data: params,
  })
}

export function deleteBlog(id) {
  return request({
    url: '/admin/blog/' + id,
    method: 'delete',
  })
}

export function formatImageSrc() {
  return request({
    url: '/admin/blog/format/image/src',
    method: 'delete',
  })
}




