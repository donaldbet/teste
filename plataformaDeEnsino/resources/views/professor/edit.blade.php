@extends('layouts.app')

@section('content')
<div id="app">
    <edit-professor :professor="{{ $professor }}"></edit-professor>
</div>
@endsection

@section('scripts')
<script src="{{ mix('js/app.js') }}"></script>
@endsection
