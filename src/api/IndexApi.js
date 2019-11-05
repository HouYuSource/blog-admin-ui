import request from '@/js/request'

export function statistical() {
  return request({
    url: '/admin/index/statistical',
    method: 'get',
  })
}

