import Vue from 'vue'
import {
  Button,
  Input,
  FormModel,
  DatePicker,
  Select,
  notification,
  Spin,
  Pagination,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(FormModel)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Pagination)
Vue.prototype.$notification = notification
