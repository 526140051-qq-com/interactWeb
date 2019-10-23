import Vue from 'vue'
import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Input,
  RadioGroup,
  RadioButton,
  Button,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Divider,
  Table,
  TableColumn,
  DatePicker,
  PageHeader,
  Avatar,
  Upload,
  Dialog,
  Cascader,
  Submenu,
  Select,
  Option,
  Transfer,
  Radio,
  Switch,
  CheckboxGroup,
  Checkbox,
  Progress,
  Link
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(PageHeader)
Vue.use(Loading.directive)
Vue.use(Avatar)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Cascader)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Option)
Vue.use(Transfer)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Progress)
Vue.use(Link)

const LOADING = {
  loadingInstance: '',
  show: function (text) {
    this.loadingInstance = Loading.service({
      lock: true,
      text: text || '提交中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  hide: function () {
    this.loadingInstance.close()
  }
}

Object.assign(Vue.prototype, {
  $loading: LOADING,
  $toast(message, type, cb) {
    Message({
      message,
      type: type || 'warning',
      onClose: () => {
        cb && cb()
      }
    })
  },
  $tips(content, cb) {
    MessageBox.confirm(content, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      cb && cb()
    }).catch(() => {
    })
  },
  $prompt(content, title, cb) {
    MessageBox.prompt(content, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      cb && cb()
    }).catch(() => {
    })
  },
  $alert(content, cb) {
    MessageBox.alert(content, '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      cb && cb()
    }).catch(() => {
    })
  }
})
