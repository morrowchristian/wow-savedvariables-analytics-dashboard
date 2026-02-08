<?php

class SavedVariablesParser {
    public function parse(string $path): array {
        $content = file_get_contents($path);

        // TODO: implement real Lua parsing
        return [
            "raw" => $content,
            "normalized" => []
        ];
    }
}
