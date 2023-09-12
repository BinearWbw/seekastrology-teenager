import Vue from 'vue'
import {
  Button,
  Input,
  FormModel,
  DatePicker,
  notification,
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(FormModel)
Vue.use(DatePicker)
Vue.prototype.$notification = notification
