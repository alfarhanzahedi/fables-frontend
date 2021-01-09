<template>
  <div>
    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="feed_masthead">
      <div class="container h-30">
        <div class="row h-100 align-items-center">
          <br />
          <br />
          <br />
          <div class="search_form fadeIn_content">
            <input
              class="search_box"
              type="text"
              name="search"
              id="search_text"
              placeholder="Find a local business"
            />
            <button class="sign_in_button button_lg">Search</button>
          </div>
        </div>
      </div>
    </header>

    <div class="secondary_nav shadow" id="secondary_nav">
      <ul>
        <li class="menu link_active" id="gift_card">
          <router-link class="nav-link" :to="{ name: 'Feed' }"
            ><a>Gift Cards</a></router-link
          >
        </li>
        <li class="menu" id="fundraiser">
          <router-link class="nav-link" :to="{ name: 'Feed' }"
            ><a>Fundraisers</a></router-link
          >
        </li>
      </ul>
    </div>

    <div class="container">
      <div class="row" id="org_feed"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedComponent",
  data: () => ({}),
  mounted() {
    let function_script = document.createElement("script");
    function_script.setAttribute(
      "src",
      "https://jugaadcdn.netlify.app/fables/functions.js"
    );
    document.head.appendChild(function_script);
  }
};
</script>
