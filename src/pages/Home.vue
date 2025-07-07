<i18n>
{
	"en": {
		"text": "Welcome to",
		"text2": "the Home page"
	}
}
</i18n>

<template>
  <p>{{ t('text') }}</p>
  <p>{{ t('text2') }}</p>
	<img src="../assets/test.jpg" alt="image">
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
img {
	width: 300px;
	height: 200px;
}

p {
	font-family: 'Raleway-Regular', sans-serif;
	font-size: 20px;
	color: #2c3e50;
}
</style>
