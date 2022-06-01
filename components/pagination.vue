<template>
<!--  added from vueSimplePagination https://github.com/ashwinkshenoy/vue-simple/tree/master/packages/vs-pagination-->
  <nav role="navigation" aria-label="Pagination Navigation">
    <ul class="vs-pagination">
      <template v-for="page in renderPages">
        <template v-if="page.isGap">
          <li class="vs-pagination--gap" :key="page.key"><a>...</a></li>
        </template>
        <template v-else>
          <li :key="page.key" :class="{ 'vs-pagination--active': page.current }">
            <a
                @click="setPage(page.value)"
                tabindex="0"
                :aria-current="page.current ? 'true' : 'false'"
            >{{ page.value }}</a>
          </li>
        </template>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    /**
     * Total no. of pages
     */
    totalPages: {
      type: Number,
    },
    /**
     * Sets the current page. Pages start at 1.
     */
    currentPage: {
      type: Number,
      default: 1,
      validator: value => {
        return value > 0;
      },
    },
    /**
     * Sets the number of pages that appear before and after active page
     * between gap indicator
     */
    pagePadding: {
      type: Number,
      default: 3,
      validator: value => {
        return value > 0;
      },
    },
    /**
     * Positions the leading and trailing gap indicator, based on
     * the current and total pages
     */
    pageGap: {
      type: Number,
      default: 2,
      validator: value => {
        return value > 0;
      },
    },
    /**
     * Hide prev and next button on reaching first or last page
     */
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      internalPage: this.currentPage,
    };
  },

  computed: {
    renderPages() {
      const pages = [];
      console.log(pages)
      const PADDING = this.pagePadding;
      const GAP = this.pageGap;

      for (let pageIndex = 1; pageIndex <= this.totalPages; pageIndex++) {
        // Always display current, first, and last pages
        if (pageIndex === this.internalPage || pageIndex < GAP || pageIndex > this.totalPages - GAP + 1) {
          pages.push(this.createPage(pageIndex));
          continue;
        }

        let minimum;
        let maximum;

        if (this.internalPage <= GAP + PADDING) {
          minimum = GAP + 1;
          maximum = minimum + PADDING * 2;
        } else if (this.internalPage >= this.totalPages - GAP - PADDING) {
          maximum = this.totalPages - GAP;
          minimum = maximum - PADDING * 2;
        } else {
          minimum = this.internalPage - PADDING;
          maximum = this.internalPage + PADDING;
        }

        // Display padded window of pages
        if (
            (pageIndex >= minimum && pageIndex <= this.internalPage) ||
            (pageIndex >= this.internalPage && pageIndex <= maximum)
        ) {
          pages.push(this.createPage(pageIndex));
          continue;
        }

        // Handle start gap
        if (pageIndex === GAP) {
          if (minimum > GAP + 1 && this.internalPage > GAP + PADDING + 1) {
            pages.push(this.createGap(pageIndex));
          } else {
            pages.push(this.createPage(pageIndex));
          }

          continue;
        }

        // Handle end gap
        if (pageIndex === this.totalPages - GAP + 1) {
          if (maximum < this.totalPages - GAP && this.internalPage < this.totalPages - GAP - PADDING) {
            pages.push(this.createGap(pageIndex));
          } else {
            pages.push(this.createPage(pageIndex));
          }
        }
      }
      return pages;
    },
  },

  watch: {
    currentPage(value) {
      this.internalPage = value;
    },
  },

  methods: {
    /**
     * Create object for page and return
     * @param {Number} pageIndex
     * @returns {Object}
     */
    createPage(pageIndex) {
      return {
        key: pageIndex,
        current: this.internalPage === pageIndex,
        value: pageIndex,
      };
    },

    /**
     * Create object for gap in page and return
     * @param {Number} pageIndex
     * @returns {Object}
     */
    createGap(pageIndex) {
      return {
        key: pageIndex,
        isGap: true,
      };
    },

    /**
     * Emit page on change
     * @params {Number}
     */
    setPage(page) {
      this.internalPage = page;
      this.$emit('change', page);
    },
  },
};
</script>

<style lang="scss">
$el: '.vs-pagination';

#{$el} {
  --page-bg-color: #f0f5fb;
  --page-color: #68737d;
  --page-active-color: #2f3941;
  --page-disabled-color: #d8d8d8;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > li {
    list-style: none;
    &:first-child a {
      margin-left: 0;
    }
    &:last-child a {
      margin-right: 0;
    }

    & > a {
      min-width: 16px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      border-radius: 4px;
      color: var(--page-color);
      font-size: 14px;
      margin-left: 2px;
      margin-right: 2px;
      user-select: none;
      &:hover {
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        font-weight: 700;
      }
      &:focus-visible {
        box-shadow: 0 0 0 2px rgb(31 115 183 / 35%);
        outline: none;
      }
    }

    &#{$el}--active a {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }

    &#{$el}--disabled > a {
      color: var(--page-disabled-color) !important;
      user-select: none;
      cursor: default;
      &:hover {
        background: transparent;
      }
    }

    &#{$el}--disabled#{$el}--no-cursor a {
      cursor: not-allowed;
    }

    &#{$el}--gap a {
      cursor: default;
      color: var(--page-color);
      &:hover {
        background: transparent;
      }
    }
  }
}
</style>
