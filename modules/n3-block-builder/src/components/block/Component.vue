<template>
  <v-col
    :cols="block.mobile_size"
    :lg="block.size"
    :offset="block_align"
    :class="['px-0']"
    :style="{
      'padding-top': $vuetify.breakpoint.mobile
        ? $getPaddingValue(block.mobile_padding_top)
        : $getPaddingValue(block.padding_top),
      'margin-top': $getMarginValue(block.margin_top),
      'padding-bottom': $vuetify.breakpoint.mobile
        ? $getPaddingValue(block.mobile_padding_bottom)
        : $getPaddingValue(block.padding_bottom),
    }"
    v-if="$vuetify.breakpoint.mobile ? !block.visibility : true"
  >
    <!-- TITLE AND TEXT -->
    <div v-if="['Text'].includes(block.format)">
      <!-- DON'T REMOVE, THIS SPAN IS USED TO PRELOAD ALL FONT SIZES FROM TAILWIND CSS IN JIT MODE -->
      <span
        :class="[
          $data._xs_font_size,
          $data._small_font_size,
          $data._base_font_size,
          $data._large_font_size,
          $data._extra_large_font_size,
          $data._2_extra_large_font_size,
          $data._3_extra_large_font_size,
          $data._4_extra_large_font_size,
          $data._5_extra_large_font_size,
          $data._6_extra_large_font_size,
          $data._7_extra_large_font_size,
          $data._8_extra_large_font_size,
          $data._9_extra_large_font_size,
          'font-gotham',
          'font-medium',
          'font-inter',
          'text-left',
          'text-center',
          'text-right',
        ]"
      ></span>
      <!-- DON'T REMOVE, THIS SPAN IS USED TO PRELOAD ALL FONT SIZES FROM TAILWIND CSS IN JIT MODE -->

      <BlockTitleText :block="block"></BlockTitleText>
    </div>
    <!-- TITLE AND TEXT -->

    <!-- LONG TEXT -->
    <div v-if="['Long Text'].includes(block.format)">
      <BlockLongText :block="block"></BlockLongText>
    </div>
    <!-- LONG TEXT -->

    <!-- DIVIDER -->
    <div v-if="['Divider'].includes(block.format)">
      <BlockDivider :block="block"></BlockDivider>
    </div>
    <!-- DIVIDER -->

    <!-- BUTTON -->
    <div v-if="['Button'].includes(block.format)">
      <BlockButton :block="block"></BlockButton>
    </div>
    <!-- BUTTON -->

    <!-- LABELS LIST -->
    <div
      v-if="['Labels'].includes(block.format)"
      class="flex flex-col lg:flex-row align-center lg:justify-center space-y-8 lg:space-y-0 lg:space-x-8"
    >
      <div v-for="label in block.labels_list" :key="label.id">
        <BlockLabel :block="label"></BlockLabel>
      </div>
    </div>
    <!-- LABELS LIST -->

    <!-- IMAGE -->
    <div v-if="['Image'].includes(block.format)">
      <BlockImage :block="block"></BlockImage>
    </div>
    <!-- IMAGE -->

    <!-- CARD -->
    <div v-if="['Card'].includes(block.format)">
      <BlockCard :block="block"></BlockCard>
    </div>
    <!-- CARD -->

    <!-- ICON -->
    <div v-if="['Icon'].includes(block.format)">
      <BlockIcon :block="block"></BlockIcon>
    </div>
    <!-- ICON -->

    <!-- FEATURE LIST -->
    <div
      v-if="['Features List'].includes(block.format)"
      class="grid grid-cols-12 lg:gap-x-20"
    >
      <BlockFeatureList :block="block"></BlockFeatureList>
    </div>
    <!-- FEATURE LIST -->

    <!-- ICONO FEATURE -->
    <div
      v-if="['Feature Icon'].includes(block.format)"
      class="grid grid-cols-12 mt-6 gap-y-12 lg:gap-y-0"
    >
      <BlockFeatureIcon :block="block"></BlockFeatureIcon>
    </div>
    <!-- ICONO FEATURE -->

    <!-- PROJECTS SLIDE -->
    <div v-if="['Projects'].includes(block.format)" class="py-10">
      <div class="flex flex-col align-center">
        <span
          class="block text-3xl font-gotham mb-4 text-gray-900 font-medium text-center w-full lg:w-6/12 uppercase"
          >Algunos de nuestros proyectos</span
        >
        <span class="block text-lg text-center mt-2 mb-12"
          >Esto lo logramos mediante la integración de estrategia, diseño y
          gestión tecnológica.</span
        >
      </div>
      <BlockProjects :block="block"></BlockProjects>
    </div>
    <!-- PROJECTS SLIDE -->

    <!-- COURSES SLIDE -->
    <div v-if="['Courses List'].includes(block.format)">
      <v-row>
        <v-col cols="12" lg="3">
          <div id="courses-wrapper">
            <div v-for="(course, index) in block.courses" :key="course.id">
              <span
                @click="setActiveCourse(index)"
                :class="[
                  'block py-2 text-slate-400 cursor-pointer',
                  index == activeCourse ? 'font-bold text-slate-600' : '',
                ]"
              >
                {{ course.name }}
              </span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="9" class="bg-slate-100 rounded-lg pl-6 py-6">
          <div id="courses-wrapper">
            <span
              class="block mb-8 uppercase font-gotham font-bold text-[24px]"
              >{{ block.courses[activeCourse].name }}</span
            >
            <span>{{ block.courses[activeCourse].description }}</span>
          </div>
        </v-col>
      </v-row>

      <!-- <v-container>
            <v-row>
              <v-col cols="12" :lg="12 - block.size" class="bg-red-200">
                Testing..
              </v-col>
            </v-row>
          </v-container> -->
    </div>
    <!-- COURSES SLIDE -->

    <!-- TAB -->
    <div v-if="['Tab'].includes(block.format)">
      <span
        @click="setActiveTab(block.id)"
        :class="[
          activeTabClass(block.id),
          block.mobile_title_font_size,
          block.title_font_size,
          'cursor-pointer block font-gotham',
        ]"
      >
        {{ block.title }}
      </span>
    </div>
    <!-- TAB -->

    <!-- INNER TAB -->
    <div v-if="['Inner Tab'].includes(block.format)" class="mt-2">
      <span
        @click="setActiveInnerTab(block.id)"
        :class="
          activeInnerTabClass(block.id) +
          ' ' +
          block.mobile_font_size +
          ' ' +
          block.font_size +
          ' cursor-pointer block'
        "
        >{{ block.title }}</span
      >
    </div>
    <!-- INNER TAB -->


    <!-- MATRIX -->
    <div v-if="['Matrix'].includes(block.format)">
       <div>
        <v-container class="max-w-screen-xl mx-auto">
          <v-row>
            <BlockComponent
              v-for="child in block.childs"
              :key="child.id"
              :block="child"
            >
            </BlockComponent>
          </v-row>
        </v-container>
      </div>
    </div>
    <!-- MATRIX -->

    <!-- GROUP -->
    <div v-if="['Group'].includes(block.format)">
      <div>
        <v-container class="max-w-screen-xl mx-auto">
          <v-row>
            <BlockComponent
              v-for="child in block.childs"
              :key="child.id"
              :block="child"
            >
            </BlockComponent>
          </v-row>
        </v-container>
      </div>

      <!-- SUPERIOR GROUP TAB -->
      <div
        v-if="
          activeTab == block.parent_block &&
          block.parent_block != null &&
          block.visibility
        "
      >
        <v-container class="max-w-screen-xl mx-auto">
          <v-row :gutter="16">
            <BlockComponent
              v-for="child in block.childs"
              :key="child.id"
              :block="child"
            >
            </BlockComponent>
          </v-row>
        </v-container>
      </div>
      <!-- SUPERIOR GROUP TAB -->

      <!-- INFERIOR GROUP TAB -->
      <div
        v-if="
          activeInnerTab == block.parent_block &&
          block.parent_block != null &&
          block.visibility
        "
      >
        <v-container class="max-w-screen-xl mx-auto">
          <v-row :gutter="16">
            <BlockComponent
              v-for="child in block.childs"
              :key="child.id"
              :block="child"
            >
            </BlockComponent>
          </v-row>
        </v-container>
      </div>
      <!-- INFERIOR GROUP TAB -->
    </div>
    <!-- GROUP -->

    <!-- GROUP SLIDER -->
    <div v-if="['Group Slider'].includes(block.format)">
      <v-container class="max-w-screen-xl mx-auto">
        <v-row>
          <BlockGroupSlider :blocks="block.childs"></BlockGroupSlider>
        </v-row>
      </v-container>
    </div>
    <!-- GROUP SLIDER -->

    <!-- TEAM MEMBERS -->
    <div v-if="['Team Members'].includes(block.format)">
      <v-row>
        <v-col
          v-for="team_member in block.team_members"
          :key="team_member.id"
          cols="12"
          lg="4"
        >
          <div>
            <div class="pa-6">
              <div class="w-full">
                <v-img
                  class="mb-6"
                  :src="$config.apiUrlV2 + '/assets/' + team_member.photo.id"
                  width="208"
                  height="208"
                  max-width="100%"
                  min-width="100%"
                  contain
                ></v-img>
              </div>

              <div class="lg:px-8">
                <span
                  class="block mt-2 font-gotham font-bold text-lg lg:text-xl"
                  >{{ team_member.name }}</span
                >
                <span
                  class="block font-inter font-thin text-[16px] text-slate-400"
                  >{{ team_member.position }}</span
                >
                <!-- <span
                  class="block mt-2 text-center text-slate-700 font-inter text-[14px]"
                  >{{ team_member.email }}</span
                > -->

                <div class="mt-4">
                  <!-- LINKEDIN -->
                  <a :href="team_member.linkedin" target="_blank">
                    <font-awesome-icon
                      icon="fa-brands fa-linkedin-in"
                      class="w-5 h-5 text-slate-900"
                      color="black"
                    />
                  </a>
                  <!-- LINKEDIN -->
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="py-4">
                  <div class="flex flex-wrap">
                    <div
                      v-for="(tag, index) in team_member.tags"
                      :key="tag.tags_id.id"
                    >
                      <v-chip
                        class="mr-4 mb-4"
                        outlined
                        label
                        :color="index == 0 ? 'purple' : 'black'"
                      >
                        {{ tag.tags_id.title }}
                      </v-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- TEAM MEMBERS -->

    <!-- CLIENTS -->
    <div v-if="['Clients'].includes(block.format)">
      <v-row v-if="block.clients.length > 0">
        <v-col
          v-for="client in block.clients"
          :key="client.id"
          cols="6"
          lg="3"
          justify="center"
          align="center"
        >
          <v-img
            v-if="client.logo"
            :src="$config.apiUrlV2 + '/assets/' + client.logo.id"
            width="65%"
            height="65%"
            contain
          ></v-img>
          <span class="block text-lg font-bold text-center">
            {{ client.name }}
          </span>
        </v-col>
      </v-row>
    </div>
    <!-- CLIENTS -->
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      _xs_font_size: "text-xs lg:text-xs",
      _small_font_size: "text-sm lg:text-sm",
      _base_font_size: "text-base lg:text-base",
      _large_font_size: "text-lg lg:text-lg",
      _extra_large_font_size: "text-xl lg:text-xl",
      _2_extra_large_font_size: "text-2xl lg:text-2xl",
      _3_extra_large_font_size: "text-3xl lg:text-3xl",
      _4_extra_large_font_size: "text-4xl lg:text-4xl",
      _5_extra_large_font_size: "text-5xl lg:text-5xl",
      _6_extra_large_font_size: "text-6xl lg:text-6xl",
      _7_extra_large_font_size: "text-7xl lg:text-7xl",
      _8_extra_large_font_size: "text-8xl lg:text-8xl",
      _9_extra_large_font_size: "text-9xl lg:text-9xl",
    };
  },
  props: {
    block: {
      type: Object,
      default: "default",
    },
  },
  mounted() {
    if (this.block) {
      if (this.block.format == "Tab") {
        this.setActiveTab(this.block.id);
      }
    }
  },
  methods: {
    setActiveTab(block_id) {
      this.$store.commit("tabs/setActiveInnerTab", null);
      this.$store.commit("tabs/setActiveTab", block_id);
    },
    setActiveInnerTab(block_id) {
      this.$store.commit("tabs/setActiveInnerTab", block_id);
    },
    setActiveCourse(course_id) {
      this.$store.commit("courses/setActiveCourse", course_id);
    },
  },
  computed: {
    activeTab() {
      return this.$store.getters["tabs/getActiveTab"];
    },
    activeInnerTab() {
      return this.$store.getters["tabs/getActiveInnerTab"];
    },
    activeTabClass() {
      return (id) => {
        return this.activeTab == id
          ? "text-slate-800 font-medium"
          : "text-slate-300";
      };
    },
    activeInnerTabClass() {
      return (id) => {
        return this.activeInnerTab == id
          ? "text-slate-800 font-medium"
          : "text-slate-400";
      };
    },
    activeCourse() {
      return this.$store.getters["courses/getActiveCourse"];
    },
    block_align() {
      switch (this.$vuetify.breakpoint.mobile) {
        case true:
          return this.block.mobile_align == "center"
            ? (12 - this.block.mobile_size) / 2
            : 0;
        case false:
          return this.block.align == "center" ? (12 - this.block.size) / 2 : 0;
      }
    },
  },
};
</script>

<style lang="postcss">
#courses-wrapper {
  @apply h-80;
  @apply overflow-y-auto;
  @apply pr-8;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

#courses-wrapper::-webkit-scrollbar {
  width: 6px;
}

#courses-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

#courses-wrapper::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 5px;
}
</style>