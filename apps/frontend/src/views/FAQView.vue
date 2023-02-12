<script setup lang="ts">
import { FAQCard } from "@/components";
import spriteLaptop from "@/assets/img/rafa-laptop.svg";
import spriteGlasses from "@/assets/img/rafa-glasses.svg";
import metrovalencia from "@/assets/img/metrovalencia.png";
import spriteTea from "@/assets/img/rafa-tea.svg";
import spritePhone from "@/assets/img/rafa-phone.svg";
</script>
<template>
  <div class="page">
    <div class="title-small" style="text-align: left; margin: 0 2rem">
      Here are a few "thanks for sharing that"
    </div>
    <div class="card-container">
      <FAQCard
        title="Finances and Expenses"
        :sprite="spriteLaptop"
        :sprite-left="true"
      >
        Valencia is known for its delicious paella and other traditional Spanish
        dishes and we want to make sure you get to experience the best of what
        the city has to offer.
        <br />
        <br />
        For the weekend, we're planning on two dinners (Friday and Saturday),
        one birthday-brunch (Sunday) and a gathering in the park (bring what you
        like).
        <br />
        <br />
        We're still finalizing the details, but we're estimating that meals will
        cost around 100€ per person for the entire weekend.
        <br />
        <br />
        When it comes to drinks, it's highly dependent on you! Drinking a cup of
        water? Or going to treat yourself with that nice bottle of Spanish Rioja
        that perfectly matches the Tapas in front of you?
        <br />
        <br />Jokes aside, if you are planning with 150€ for Friday and Saturday
        evening, as well as the birthday brunch, you should be on the safe side!
      </FAQCard>
      <FAQCard title="Where to stay?" :sprite="spriteGlasses">
        Ruzafa is known for its trendy bars and restaurants, as well as its
        colorful street art and bohemian vibe. It's the perfect spot for those
        looking to experience Valencia's vibrant nightlife and cultural
        scene.<br />
        El Carmen on the other hand, is a historic neighborhood with narrow
        winding streets, charming plazas, and beautiful old buildings. It's a
        great area to explore for those interested in architecture and
        history.<br />
        Benimaclet, it's a neighborhood with a lot of personality. It's known
        for its lively atmosphere and its street art and murals. It's the
        perfect spot for those looking for a more laid-back bohemian experience.
        <ul class="notes" style="font-size: 0.8rem; margin: 0.5rem auto">
          <li>Hostel (from €15 per night)</li>
          <li>Hotel (from €60 per night)</li>
          <li>Airbnb (depends, the usual)</li>
        </ul>
      </FAQCard>
      <FAQCard title="What to bring?" :sprite="spriteTea" :sprite-left="true">
        <ul class="notes" style="font-size: 0.8rem; margin: 0.5rem auto">
          <li>
            Comfortable shoes: Valencia is a city to be explored on foot, so
            make sure to bring a pair of comfortable shoes that you can walk in
            all day.
          </li>
          <li>
            Light clothing: April in Valencia can be quite warm, so pack light
            clothing that can be layered.
          </li>
          <li>
            A small backpack or shoulder bag: You'll likely be out and about all
            day, so bring a small backpack or shoulder bag to carry your
            essentials like a camera, phone, and wallet.
          </li>
          <li>
            A rain jacket or umbrella: April can be a rainy month in Valencia,
            so bring a rain jacket or umbrella just in case.
          </li>
          <li>
            A small Spanish phrasebook: Even though English is widely spoken in
            Valencia, having a small Spanish phrasebook will come in handy when
            you're out and about.
          </li>
          <li>Whatever else you might need for a perfect weekend!</li>
        </ul>
      </FAQCard>
      <FAQCard
        title="How to get around"
        :sprite="spritePhone"
        :background-image="metrovalencia"
      >
        The metro is a great option for getting around quickly and you can reach
        most destinations in just a few minutes. Bus and tram are also great
        options. <br />Another great way to get around Valencia is by bike. Get
        a Valenbisi subscription or rent one for a day. Cycling is a fantastic
        way to explore Valencia's lovely parks and waterfront. <br />Valencia is
        a very walkable city with many pedestrianized streets and plazas. It's a
        great way to explore the city and discover hidden gems. <br />Finally,
        if you're planning on making day trips outside of Valencia, you can take
        the train to reach nearby towns and cities.
        <ul class="notes" style="font-size: 0.8rem; margin: 0.5rem auto">
          <li>
            Airport - City: by Metro from 5.00am to 11.30pm (€5.80) or taxi (€15
            - €20; pay by card or cash)
          </li>
          <li>Bus ride single fare: €1.50</li>
          <li>
            Valenbisi (Valencias bike sharing system): €13 for a whole week!
          </li>
        </ul>
        <div class="buttons">
          <button
            class="button"
            onclick="window.open('https://www.metrovalencia.es/');"
          >
            MetroValencia
          </button>
          <button
            class="button"
            onclick="window.open('https://www.valenbisi.es/en/home');"
          >
            Valenbisi
          </button>
        </div>
      </FAQCard>
    </div>
  </div>
</template>
<style>
.buttons {
  margin: 0.5rem auto;
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
}
.card-container {
  margin: 0 auto;
  max-width: 90rem;
}
.card-container > * {
  margin: 1.5rem auto;
  float: left;
}
.card-container > *:nth-of-type(2n) {
  float: right;
}
</style>
