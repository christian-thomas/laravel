<template>
	<div
		class="relative w-full"
		:class="$props.ratioClass"
	>
		<slot :placeholder-class="cPlaceholderClass">
			<img :class="cPlaceholderClass" v-bind="$attrs">
		</slot>
	</div>
</template>

<script>
	export default {
		inheritAttrs: false,

		props: {
			ratioClass: {
				type: String,
				default: 'pt-9/16',
			},
		},

		computed: {
			cPlaceholderClass() {
				return 'absolute top-0 left-0 w-full h-full';
			},
		},
	};
</script>
