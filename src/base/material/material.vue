<template>
  <div class="material">
    <el-tabs type="border-card">
      <el-tab-pane label="幼儿信息">
        <div class="section sec1">
          <div class="section-left">
            <img :src="item.photo" alt="">
            <div class="state">{{formatState(item.state)}}</div>
          </div>
          <div class="section-right">
            <table class="table">
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">姓名</div>
                    <div class="cell-content">{{item.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">性别</div>
                    <div class="cell-content">{{item.gender === 1 ? '男' : '女'}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件类型</div>
                    <div class="cell-content">{{item.cardCategory.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件号码</div>
                    <div class="cell-content">{{item.idNumber}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">出生日期</div>
                    <div class="cell-content">{{formatDate(item.birthday)}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">港澳台侨外</div>
                    <div class="cell-content">{{item.overseas.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">户口所在地</div>
                    <div class="cell-content">{{domicileArea}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">现住址</div>
                    <div class="cell-content">{{residenceArea}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">出生地</div>
                    <div class="cell-content">{{bornArea}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">国籍</div>
                    <div class="cell-content">{{item.nationality.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">籍贯</div>
                    <div class="cell-content">{{originArea}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">民族</div>
                    <div class="cell-content">{{item.nation.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">入园年月</div>
                    <div class="cell-content">{{formatDate(item.inTime)}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">就读方式</div>
                    <div class="cell-content">{{item.modeType === 1 ? '走读' : '住校'}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">健康状况</div>
                    <div class="cell-content">{{item.healthy.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">血型</div>
                    <div class="cell-content">{{item.blood.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否独生子女</div>
                    <div class="cell-content">{{item.isOnly === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否孤儿</div>
                    <div class="cell-content">{{item.isOrphan === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">出生医学证明</div>
                    <div class="cell-content">{{item.isBirthCertificate === 1 ? '有' : '无'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">预防接种证</div>
                    <div class="cell-content">{{item.isVaccinationCertificate === 1 ? '有' : '无'}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否来自低保家庭</div>
                    <div class="cell-content">{{item.isLow === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否留守儿童</div>
                    <div class="cell-content">{{item.stay.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否过敏</div>
                    <div class="cell-content">{{item.allergy === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">过敏源</div>
                    <div class="cell-content">{{item.allergyRemark || '未填'}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否残疾幼儿</div>
                    <div class="cell-content">{{item.disability.name}}</div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="家庭信息">
        <div class="section sec2">
          <div class="section-left">第一监护人信息</div>
          <div class="section-right">
            <table class="table">
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">姓名</div>
                    <div class="cell-content">{{first.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">与幼儿关系</div>
                    <div class="cell-content">{{first.nexus.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">性别</div>
                    <div class="cell-content">{{first.gender === 1 ? '男' : '女'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">出生年月</div>
                    <div class="cell-content">{{formatDate(first.birthday)}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件类型</div>
                    <div class="cell-content">{{first.cardCategory.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件号码</div>
                    <div class="cell-content">{{first.idNumber}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">民族</div>
                    <div class="cell-content">{{first.nation.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">国籍</div>
                    <div class="cell-content">{{first.nationality.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否法定监护人</div>
                    <div class="cell-content">{{first.isLegal === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">联系地址</div>
                    <div class="cell-content">{{firstArea}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">学历</div>
                    <div class="cell-content">{{first.degree.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">工作单位</div>
                    <div class="cell-content">{{first.workUnit}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">职务</div>
                    <div class="cell-content">{{first.workPost}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">联系电话</div>
                    <div class="cell-content">{{first.phone}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="cell">
                    <div class="cell-lbl">电子信箱</div>
                    <div class="cell-content">{{first.email}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="cell">
                    <div class="cell-lbl">身份证件正反面</div>
                    <div class="cell-content">
                      <div v-if="!first.imgFirst">无</div>
                      <div v-else class="guardian">
                        <div class="guardian-item">
                          <preview-pic :images="idCardPositiveImgFir"></preview-pic>
                          <!--<div class="img"><img :src="first.imgFirst" alt=""></div>-->
                          <div class="txt">正面</div>
                        </div>
                        <div class="guardian-item">
                          <preview-pic :images="idCardReverseImgFir"></preview-pic>
                          <!--<div class="img"><img :src="first.imgSecond" alt=""></div>-->
                          <div class="txt">反面</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="line"></div>
        <div class="section sec2">
          <div class="section-left">第二监护人信息</div>
          <div class="section-right" v-if="second">
            <table class="table">
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">姓名</div>
                    <div class="cell-content">{{second.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">与幼儿关系</div>
                    <div class="cell-content">{{second.nexus.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">性别</div>
                    <div class="cell-content">{{second.gender === 1 ? '男' : '女'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">出生年月</div>
                    <div class="cell-content">{{formatDate(second.birthday)}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件类型</div>
                    <div class="cell-content">{{second.cardCategory.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">身份证件号码</div>
                    <div class="cell-content">{{second.idNumber}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">民族</div>
                    <div class="cell-content">{{second.nation.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">国籍</div>
                    <div class="cell-content">{{second.nationality.name}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">是否法定监护人</div>
                    <div class="cell-content">{{second.isLegal === 1 ? '是' : '否'}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">联系地址</div>
                    <div class="cell-content">{{secondArea}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">学历</div>
                    <div class="cell-content">{{second.degree.name}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">工作单位</div>
                    <div class="cell-content">{{second.workUnit}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">职务</div>
                    <div class="cell-content">{{second.workPost}}</div>
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">联系电话</div>
                    <div class="cell-content">{{second.phone}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="cell">
                    <div class="cell-lbl">电子信箱</div>
                    <div class="cell-content">{{second.email}}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="cell">
                    <div class="cell-lbl">身份证件正反面</div>
                    <div class="cell-content">
                      <div v-if="!second.imgFirst">无</div>
                      <div v-else class="guardian">
                        <div class="guardian-item">
                          <preview-pic :images="idCardPositiveImgSec"></preview-pic>
                          <!--<div class="img"><img :src="second.imgFirst" alt=""></div>-->
                          <div class="txt">正面</div>
                        </div>
                        <div class="guardian-item">
                          <preview-pic :images="idCardReverseImgSec"></preview-pic>
                          <!--<div class="img"><img :src="second.imgSecond" alt=""></div>-->
                          <div class="txt">反面</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="section-right" v-else>
            <table class="table">
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">无</div>
                    <div class="cell-content"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="cell">
                    <div class="cell-lbl">备注</div>
                    <div class="cell-content">{{item.noSecondRemark || '未填'}}</div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="双证信息">
        <div class="house">
          <div class="house-item">
            <div class="house-l">所属小区</div>
            <div class="house-r">{{item.quarters.name}}</div>
          </div>
          <div class="house-item">
            <div class="house-l">房产证号</div>
            <div class="house-r">{{item.propertyNum}}</div>
          </div>
          <div class="house-item">
            <div class="house-l">房产证照片</div>
            <div class="house-r">
              <div v-if="!item.propertyCertificateFiles.length">无</div>
              <preview-pic v-else :images="item.propertyCertificateFiles"></preview-pic>
            </div>
          </div>
          <div class="house-item">
            <div class="house-l">户口本照片</div>
            <div class="house-r">
              <div v-if="!item.hkba">无</div>
              <preview-pic v-else :images="registeredResidenceFiles"></preview-pic>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="附件信息">-->
      <!--<div class="house">-->
      <!--<div class="house-item">-->
      <!--<div class="house-l">动迁证明(或无房证明)</div>-->
      <!--<div class="house-r">-->
      <!--<div v-if="!item.otherFiles.length">无</div>-->
      <!--<preview-pic v-else :images="item.otherFiles"></preview-pic>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="其它证明">
        <div class="house">
          <div class="house-item">
            <div class="house-l">出生医学证明</div>
            <div class="house-r">
              <div v-if="!item.yxzm">无</div>
              <preview-pic v-else :images="yxzm"></preview-pic>
            </div>
          </div>
          <div class="house-item">
            <div class="house-l">预防接种证明</div>
            <div class="house-r">
              <div v-if="!item.jzzm">无</div>
              <preview-pic v-else :images="jzzm"></preview-pic>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import PreviewPic from 'base/preview-pic/preview-pic'
  import {formatState} from 'common/js/parameter'

  export default {
    props: {
      item: {
        type: Object,
        default: () => {
        }
      }
    },
    computed: {
      domicileArea() { // 户口所在地
        const {domicile, domicileArea} = this.item
        // 省 - 市 - 区 - 详细地址
        const province = domicileArea.parentArea.parentArea.name
        const city = domicileArea.parentArea.name
        const area = domicileArea.name
        return province + city + area + domicile
      },
      residenceArea() { // 现住址
        const {residence, residenceArea} = this.item
        // 省 - 市 - 区 - 详细地址
        const province = residenceArea.parentArea.parentArea.name
        const city = residenceArea.parentArea.name
        const area = residenceArea.name
        return province + city + area + residence
      },
      bornArea() { // 出生地
        const {bornArea} = this.item
        // 省 - 市
        const province = bornArea.parentArea.name
        const city = bornArea.name
        return province + city
      },
      originArea() { // 籍贯
        const {originArea} = this.item
        // 省 - 市
        const province = originArea.parentArea.name
        const city = originArea.name
        return province + city
      },
      first() {
        return this.item.firstGuardian
      },
      firstArea() { // 第一监护人联系地址
        const {address, area} = this.item.firstGuardian
        // 省 - 市 - 区 - 详细地址
        const province = area.parentArea.parentArea.name
        const city = area.parentArea.name
        const farea = area.name
        return province + city + farea + address
      },
      second() {
        return this.item.secondGuardian
      },
      secondArea() { // 第二监护人联系地址
        const {address, area} = this.item.secondGuardian
        // 省 - 市 - 区 - 详细地址
        const province = area.parentArea.parentArea.name
        const city = area.parentArea.name
        const farea = area.name
        return province + city + farea + address
      },
      yxzm() { // 出生医学证明
        let ret = []
        let obj = {
          id: 1,
          url: this.item.yxzm
        }
        ret.push(obj)
        return ret
      },
      jzzm() { // 预防接种证明
        let ret = []
        let obj = {
          id: 1,
          url: this.item.jzzm
        }
        ret.push(obj)
        return ret
      },
      registeredResidenceFiles() {
        let ret = []
        let {hkba, hkbd, hkbb, hkbc} = this.item
        if (hkba) {
          ret.push({id: 1, url: hkba})
          ret.push({id: 2, url: hkbd})
          ret.push({id: 3, url: hkbb})
          ret.push({id: 4, url: hkbc})
        }
        return ret
      },
      idCardPositiveImgFir() { // 第一监护人身份证正面
        let ret = []
        let obj = {
          id: 1,
          url: this.item.firstGuardian.imgFirst
        }
        ret.push(obj)
        return ret
      },
      idCardReverseImgFir() { // 第一监护人身份证反面
        let ret = []
        let obj = {
          id: 1,
          url: this.item.firstGuardian.imgSecond
        }
        ret.push(obj)
        return ret
      },
      idCardPositiveImgSec() {
        let ret = []
        if (this.item.secondGuardian) {
          let obj = {
            id: 1,
            url: this.item.secondGuardian.imgFirst
          }
          ret.push(obj)
        }
        return ret
      },
      idCardReverseImgSec() {
        let ret = []
        if (this.item.secondGuardian) {
          let obj = {
            id: 1,
            url: this.item.secondGuardian.imgSecond
          }
          ret.push(obj)
        }
        return ret
      }
    },
    data() {
      return {
        src: 'http://msloanh5.oss-cn-beijing.aliyuncs.com/img/banner.693dc796.jpg'
      }
    },
    methods: {
      formatDate(time) {
        if (!time) return ''
        return moment(time).format('YYYY-MM-DD')
      },
      formatState(state) {
        return formatState(state)
      }
    },
    components: {
      PreviewPic
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~stylus/mixin"

  .guardian
    display: flex
    padding: 0 0 30px 0
    .guardian-item
      margin: 0 50px 0 0
      width: 120px
      height: 120px
      text-align: center
      img
        width: 120px
        height: 120px
      .txt
        height: 50px
        line-height: 50px

  .line
    width: 100%
    height: 1px
    background: #eee
    margin: 15px 0

  .section
    display: flex
    justify-content: space-between
    .section-left
      padding-top: 15px
      width: 180px
      flex: 0 0 180px
      .state
        padding-top: 20px
        text-align: center
        color: $color
        width: 120px
        font-size: 16px
    .section-right
      flex: 1
      .table
        width: 100%
        td
          width: 50%
          box-sizing: border-box
          padding: 10px
          line-height: 1.4
          .cell
            display: flex
            .cell-lbl
              color: #999
              width: 130px
              flex: 0 0 130px
            .cell-content
              flex: 1

  .sec1
    .section-left
      img
        position: relative
        top: -5px
        border-radius: 50%
        width: 120px
        height: 120px

  .sec2
    .section-left
      color: $color

  .house
    padding: 10px 0
    .house-item
      margin-top: 25px
      &:first-child
        margin: 0
      display: flex
      .house-l
        color: #999
        width: 150px
        flex: 0 0 150px
      .house-r
        flex: 1
        img
          width: 120px
          height: 120px
          margin-right: 25px
</style>
