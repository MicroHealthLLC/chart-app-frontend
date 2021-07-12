<template>
  <v-row>
    <v-col class="col-9">
      <h3>Public Reports</h3>
      <v-divider class="mb-4"></v-divider>
      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-line</v-icon>
            <div><h5>Report 1</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 1</li>
              <li><strong>Channel:</strong> Channel 1</li>
            </ul>
            <v-chip x-small>Employee Data</v-chip>
            <v-chip x-small>Company Reports</v-chip>
          </v-card-text>
        </v-card>
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-pie</v-icon>
            <div><h5>Report 2</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 2</li>
              <li><strong>Channel:</strong> Channel 2</li>
            </ul>
            <v-chip x-small>Monthly</v-chip>
          </v-card-text>
        </v-card>
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-bar</v-icon>
            <div><h5>Report 3</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 3</li>
              <li><strong>Channel:</strong> Channel 3</li>
            </ul>
            <v-chip x-small>Sales</v-chip>
            <v-chip x-small>Weekly</v-chip>
          </v-card-text>
        </v-card>
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-donut</v-icon>
            <div><h5>Report 4</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 4</li>
              <li><strong>Channel:</strong> Channel 4</li>
            </ul>
            <v-chip x-small>Performance</v-chip>
            <v-chip x-small>Sales</v-chip>
            <v-chip x-small>Monthly</v-chip>
          </v-card-text>
        </v-card>
      </div>
      <h3 class="mt-4">Personal Reports</h3>
      <v-divider class="mb-4"></v-divider>
      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-pie</v-icon>
            <div><h5>Report 5</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 5</li>
              <li><strong>Channel:</strong> Channel 5</li>
            </ul>
            <v-chip x-small>Monthly</v-chip>
          </v-card-text>
        </v-card>
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-bar</v-icon>
            <div><h5>Report 6</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 6</li>
              <li><strong>Channel:</strong> Channel 6</li>
            </ul>
            <v-chip x-small>Sales</v-chip>
            <v-chip x-small>Weekly</v-chip>
          </v-card-text>
        </v-card>
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-donut</v-icon>
            <div><h5>Report 7</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 7</li>
              <li><strong>Channel:</strong> Channel 7</li>
            </ul>
            <v-chip x-small>Performance</v-chip>
            <v-chip x-small>Sales</v-chip>
            <v-chip x-small>Monthly</v-chip>
          </v-card-text>
        </v-card>
      </div>
      <h3 class="mt-4">Group Reports</h3>
      <v-divider class="mb-4"></v-divider>
      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <v-card class="report-card">
          <v-card-title>
            <v-icon class="mr-4" color="info">mdi-chart-donut</v-icon>
            <div><h5>Report 8</h5></div>
          </v-card-title>
          <v-card-text>
            <ul class="mb-4">
              <li><strong>Data Set:</strong> Data Set 8</li>
              <li><strong>Channel:</strong> Channel 8</li>
            </ul>
            <v-chip x-small>Performance</v-chip>
            <v-chip x-small>Sales</v-chip>
            <v-chip x-small>Monthly</v-chip>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
    <v-col class="col-3">
      <h3>Details</h3>
      <v-divider class="mb-4"></v-divider>
      <ul class="text-caption details">
        <li><strong><v-icon small>mdi-file-chart-outline</v-icon> Total Reports:</strong> 105</li>
        <li><strong><v-icon small>mdi-menu</v-icon> Channels:</strong> 52</li>
        <li><strong><v-icon small>mdi-account-group</v-icon> Active Users:</strong> 12</li>
      </ul>
      <h3 class="mt-4">News</h3>
      <v-divider class="mb-4"></v-divider>
      <v-card class="mb-2" color="info" dark
        ><v-card-title class="d-flex flex-row flex-nowrap"
          ><v-icon class="mr-3">mdi-account-circle</v-icon>
          <span
            ><h5>Breaking News! This just in!</h5>
            <p class="text-caption mb-0">Christopher Calderon</p>
            <p class="text-caption mb-0">1 Month ago</p></span
          ></v-card-title
        ><v-divider></v-divider
        ><v-card-text class="text-caption"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non eveniet
          dolore magnam delectus soluta quis, deserunt quod quisquam
          reprehenderit quam exercitationem quas commodi officia porro harum
          pariatur repellat sed minus!</v-card-text
        ></v-card
      ><v-card color="info" dark
        ><v-card-title class="d-flex flex-row flex-nowrap"
          ><v-icon class="mr-3">mdi-account-circle</v-icon>
          <span
            ><h5>Some Old News...</h5>
            <p class="text-caption mb-0">Christopher Calderon</p>
            <p class="text-caption mb-0">1 Month ago</p></span
          ></v-card-title
        ><v-divider></v-divider
        ><v-card-text class="text-caption"
          >Non eveniet dolore magnam delectus soluta quis, deserunt quod
          quisquam reprehenderit quam exercitationem quas commodi officia porro
          harum pariatur repellat sed minus!</v-card-text
        ></v-card
      ></v-col
    >
  </v-row>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.report-card {
  width: 32%;
  border: 1px solid lightgray;
  border-left: 3px solid #1976d2 !important;
  margin-bottom: 10px;
}
.report-card ul, .details {
  list-style: none;
  margin: 0;
  padding: 0;
}
.v-card__title {
  line-height: 1;
  word-break: normal;
}
</style>
