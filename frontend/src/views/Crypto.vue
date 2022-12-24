<script setup lang="ts">
import {CoinGeckoApi} from '../stores/CoinGeckoApi';
const data =  CoinGeckoApi.getTrend();
data.then( (value:string) => {
    value["coins"].forEach(element => {
        console.log(element);
    });
});
</script>

<template>
    <div>
        <link rel="stylesheet" href="@/assets/style.css">
        <header>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
            </div>
        </header>
        <body>
            <div>
                <div class="bg-gradient-to-r from-red-500 ..." >

                        Ceci est un exemple de gradient
                </div>
            </div>
        </body>
    </div>
</template>
