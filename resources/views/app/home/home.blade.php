@extends('layouts/app')

@section('content')
	<div class="my-12 space-y-12 max-w-sm">
		{{-- Default --}}
		<placeholder
			src="https://placehold.it/1600x900"
			alt=""
		>
		</placeholder>

		{{-- Ratio override --}}
		<placeholder
			src="https://placehold.it/200x200"
			alt=""
			ratio-class="pt-full"
		>
		</placeholder>

		{{-- Custom slot --}}
		<placeholder>
			<div
				slot-scope="{ placeholderClass }"
				:class="placeholderClass"
				class="flex items-end bg-red"
			>
				Anim labore qui
			</div>
		</placeholder>

		{{-- Roll your own classes --}}
		<placeholder>
			<div
				class="
					absolute top-0 left-0
					flex items-end bg-blue
				"
			>
				Anim labore qui
			</div>
		</placeholder>
	</div>
@endsection
