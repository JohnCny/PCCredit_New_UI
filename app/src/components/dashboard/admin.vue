<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <div class="panel-body">
          <div class="row">
            <into-piece></into-piece>
            <org-loan></org-loan>
          </div>
          <div class="row">
            <overdue-piece></overdue-piece>
            <orgoverdue-bad></orgoverdue-bad>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-ground">
                <label for=""style="font-size:18px;color:#49586e;">各机构（团队）绩效金额</label>
                <div class="input-icon right">
                  <table class="table table-striped">
                    <thead>
                    <th>团队1</th>
                    <th>团队2</th>
                    <th>团队3</th>
                    </thead>
                    <tbody>
                    <tr>
                      <td>300</td>
                      <td>500</td>
                      <td>600</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import QK from '../../QK'
  import echarts from 'echarts'
  import intoPiece from './intoPiece.vue'
  import orgLoan from './orgLoan.vue'
  import overduePiece from './overduePiece.vue'
  import orgoverdueBad from './orgoverdueBad.vue'
  export default{
   components:{
   intoPiece,
   orgLoan,
   overduePiece,
   orgoverdueBad
   },
    data(){
      return {

      }
    },

     ready() {

     },
    methods: {

    }
  }
</script>
