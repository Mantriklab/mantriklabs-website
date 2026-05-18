Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$componentRoot = Join-Path $root "components"
$archiveRoot = Join-Path $root "archive\\archived-pages"

$componentMap = @{
    "Header" = "header"
    "Hero Banner" = "hero-banner"
    "Select Work" = "select-work"
    "section-about-us" = "about"
    "section-partner" = "partner"
    "section-services" = "services"
    "section-services-single" = "service-single"
    "section-featured-works" = "featured-works"
    "section-work-single" = "work-single"
    "section-process" = "process"
    "section-benefits" = "benefits"
    "section-features" = "features"
    "section-tools" = "tools"
    "section-team" = "team"
    "section-statistic" = "statistic"
    "section-awards" = "awards"
    "section-testimonials" = "testimonials"
    "section-pricing" = "pricing"
    "section-faqs" = "faqs"
    "section-contact" = "contact"
    "section-delay" = "delay-cta"
    "Blog With Sidebar" = "blog-single"
    "Blog Grid 2" = "blog-grid"
    "page-title" = "page-title"
    "map" = "map"
    "404" = "error-404"
    "footer" = "footer"
    "Mobile Menu" = "mobile-menu"
    "Left Bar" = "left-bar"
    "Setting Color" = "setting-color"
}

$editableByComponent = @{
    "header" = @("Logo image", "Navigation labels", "Navigation links", "CTA label", "CTA link")
    "mobile-menu" = @("Logo image", "Mobile navigation labels", "Mobile navigation links")
    "footer" = @("Footer logo", "Footer description", "Footer links", "Newsletter form text", "Copyright text")
    "hero-banner" = @("Eyebrow text", "Headline text", "Supporting text", "Hero image or video", "Button labels", "Button links")
    "services" = @("Service titles", "Service descriptions", "Service images", "Service detail links")
    "service-single" = @("Service title", "Service images", "Service body copy", "Sidebar links", "CTA links")
    "featured-works" = @("Work titles", "Work categories", "Work images", "Work detail links")
    "work-single" = @("Work title", "Work images", "Project metadata", "Project body copy", "Related work links")
    "blog-single" = @("Blog title", "Blog image", "Blog body copy", "Author details", "Sidebar links")
    "blog-grid" = @("Blog titles", "Blog images", "Blog excerpts", "Blog links")
    "contact" = @("Contact text", "Contact form labels", "Contact links", "Contact image")
    "faqs" = @("FAQ questions", "FAQ answers")
    "pricing" = @("Plan names", "Plan prices", "Feature lists", "Button labels", "Button links")
}

function Get-Slug([string]$label) {
    if ($componentMap.ContainsKey($label)) {
        return $componentMap[$label]
    }

    $slug = $label.ToLowerInvariant()
    $slug = $slug -replace '[^a-z0-9]+', '-'
    $slug = $slug.Trim('-')
    if ([string]::IsNullOrWhiteSpace($slug)) {
        return "section"
    }
    return $slug
}

function Get-EditableList([string]$slug) {
    if ($editableByComponent.ContainsKey($slug)) {
        return $editableByComponent[$slug]
    }
    return @("Text content", "Images or media", "Links and buttons")
}

function Get-Metadata([string]$slug, [string[]]$pages) {
    $usedOn = ($pages | Sort-Object -Unique) -join ", "
    $lines = New-Object System.Collections.Generic.List[string]
    $lines.Add("<!--")
    $lines.Add("Component: $slug")
    $lines.Add("Used on: $usedOn")
    $lines.Add("Editable fields:")
    foreach ($field in (Get-EditableList $slug)) {
        $lines.Add("REPLACE: $field")
    }
    $lines.Add("-->")
    return ($lines -join [Environment]::NewLine)
}

function Convert-SectionLabel([string]$raw) {
    return $raw.Trim()
}

function Get-Sections([string]$content) {
    $startRegex = [regex]'(?m)^[ \t]*<!--\s*(?!/)([^>]+?)\s*-->\s*$'
    $sections = New-Object System.Collections.Generic.List[object]

    foreach ($match in $startRegex.Matches($content)) {
        $label = Convert-SectionLabel $match.Groups[1].Value
        if (-not $componentMap.ContainsKey($label)) {
            continue
        }

        $endPattern = "(?m)^[ \t]*<!--\s*/" + [regex]::Escape($label) + "\s*-->\s*$"
        $endMatch = [regex]::Match($content.Substring($match.Index + $match.Length), $endPattern)
        if (-not $endMatch.Success) {
            continue
        }

        $endIndex = $match.Index + $match.Length + $endMatch.Index + $endMatch.Length
        $sections.Add([pscustomobject]@{
            Label = $label
            Slug = Get-Slug $label
            Start = $match.Index
            End = $endIndex
            Text = $content.Substring($match.Index, $endIndex - $match.Index)
        })
    }

    return $sections
}

function Get-CleanHeader {
    return @'
        <!-- Header -->
        <header class="tf-header header2">
            <div class="header-inner">
                <a href="index.html" class="logo-site">
                    <img src="assets/images/logo/logo.svg" alt="">
                </a>
                <div class="box-navigation">
                    <ul class="nav-menu-main">
                        <li class="menu-item">
                            <a href="index.html" class="item-link link1">Home</a>
                        </li>
                        <li class="menu-item">
                            <a href="about.html" class="item-link link1">About</a>
                        </li>
                        <li class="menu-item">
                            <a href="service.html" class="item-link link1">Services</a>
                        </li>
                        <li class="menu-item">
                            <a href="work.html" class="item-link link1">Works</a>
                        </li>
                        <li class="menu-item">
                            <a href="blog-single.html" class="item-link link1">Blog</a>
                        </li>
                        <li class="menu-item">
                            <a href="contact.html" class="item-link link1">Contact</a>
                        </li>
                    </ul>
                </div>
                <a href="contact.html" class="tf-btn d-lg-flex d-none">
                    Start a Project
                </a>
                <a href="#" class="tf-btn open-mb-menu mobile-menu d-lg-none d-flex">
                    <i class="icon icon-grip-lines-solid"></i>
                </a>
            </div>
        </header>
        <!-- /Header -->
'@
}

function Get-CleanMobileMenu {
    return @'
    <!-- Mobile Menu -->
    <div class="offcanvas-menu">
        <div class="mb-container">
            <div class="mb-menu-content">
                <div class="mb-menu-top">
                    <div class="mb-menu-title">
                        <a href="index.html" class="logo-site">
                            <img src="assets/images/logo/logo-2.svg" alt="">
                        </a>
                        <div class="btn-mobile-menu close-mb-menu text-caption link">
                            <i class="icon icon-close"></i>
                        </div>
                    </div>
                    <ul class="nav-ul-mb" id="mobile-menu">
                        <li class="nav-mb-item">
                            <a href="index.html" class="mb-menu-link text-display-1">Home</a>
                        </li>
                        <li class="nav-mb-item">
                            <a href="about.html" class="mb-menu-link text-display-1">About</a>
                        </li>
                        <li class="nav-mb-item">
                            <a href="service.html" class="mb-menu-link text-display-1">Services</a>
                        </li>
                        <li class="nav-mb-item">
                            <a href="work.html" class="mb-menu-link text-display-1">Works</a>
                        </li>
                        <li class="nav-mb-item">
                            <a href="blog-single.html" class="mb-menu-link text-display-1">Blog</a>
                        </li>
                        <li class="nav-mb-item">
                            <a href="contact.html" class="mb-menu-link text-display-1">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="mb-other-content">
                    <div class="d-flex group-icon">
                        <a href="#" class="box-icon w-48 social">
                            <i class="icon icon-fb"></i>
                        </a>
                        <a href="#" class="box-icon w-48 social">
                            <i class="icon icon-telegram"></i>
                        </a>
                        <a href="#" class="box-icon w-48 social">
                            <i class="icon icon-youtube"></i>
                        </a>
                        <a href="#" class="box-icon w-48 social">
                            <i class="icon icon-x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Mobile Menu -->
'@
}

New-Item -ItemType Directory -Path $componentRoot -Force | Out-Null

$allPages = Get-ChildItem -Path $root -File -Filter "*.html" | Sort-Object Name
$contentByPage = @{}
$sectionsBySlug = @{}
$pagesBySlug = @{}

foreach ($page in $allPages) {
    $content = Get-Content -LiteralPath $page.FullName -Raw
    $contentByPage[$page.Name] = $content
    foreach ($section in (Get-Sections $content)) {
        if (-not $sectionsBySlug.ContainsKey($section.Slug)) {
            $sectionsBySlug[$section.Slug] = New-Object System.Collections.Generic.List[object]
        }
        if (-not $pagesBySlug.ContainsKey($section.Slug)) {
            $pagesBySlug[$section.Slug] = New-Object System.Collections.Generic.List[string]
        }
        $sectionsBySlug[$section.Slug].Add([pscustomobject]@{
            Page = $page.Name
            Label = $section.Label
            Text = $section.Text
        })
        $pagesBySlug[$section.Slug].Add($page.Name)
    }
}

foreach ($slug in ($sectionsBySlug.Keys | Sort-Object)) {
    $dir = Join-Path $componentRoot $slug
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    $pages = @($pagesBySlug[$slug] | Sort-Object -Unique)
    $metadata = Get-Metadata $slug $pages
    $seen = @{}
    $variantNumber = 1

    foreach ($entry in $sectionsBySlug[$slug]) {
        $sha = [System.Security.Cryptography.SHA256]::Create()
        $hashBytes = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($entry.Text))
        $sha.Dispose()
        $hash = ([BitConverter]::ToString($hashBytes) -replace '-', '').Substring(0, 12).ToLowerInvariant()
        if ($seen.ContainsKey($hash)) {
            continue
        }
        $seen[$hash] = $true

        $pageStem = [System.IO.Path]::GetFileNameWithoutExtension($entry.Page)
        $fileName = if ($variantNumber -eq 1) { "$slug.html" } else { "$slug--$pageStem.html" }
        $filePath = Join-Path $dir $fileName
        $componentText = $metadata + [Environment]::NewLine + $entry.Text.TrimEnd() + [Environment]::NewLine
        Set-Content -LiteralPath $filePath -Value $componentText -NoNewline
        $variantNumber++
    }

    $readme = @(
        "# $slug",
        "",
        "Used on: " + (($pages | Sort-Object -Unique) -join ", "),
        "",
        "Editable fields:",
        ((Get-EditableList $slug) | ForEach-Object { "- REPLACE: $_" }),
        "",
        "These snippets preserve the original template markup and asset paths for copy-paste reuse in root-level HTML pages."
    ) -join [Environment]::NewLine
    Set-Content -LiteralPath (Join-Path $dir "README.md") -Value ($readme + [Environment]::NewLine) -NoNewline
}

foreach ($page in $allPages) {
    $content = $contentByPage[$page.Name]
    $sections = @(Get-Sections $content | Sort-Object Start -Descending)
    foreach ($section in $sections) {
        $pages = @($pagesBySlug[$section.Slug] | Sort-Object -Unique)
        $metadata = Get-Metadata $section.Slug $pages
        $block = $content.Substring($section.Start, $section.End - $section.Start)
        if ($block -notmatch 'Component:\s*') {
            $replacement = $metadata + [Environment]::NewLine + $block
            $content = $content.Substring(0, $section.Start) + $replacement + $content.Substring($section.End)
        }
    }

    $content = [regex]::Replace($content, '(?s)[ \t]*<!-- Header -->.*?<!-- /Header -->', (Get-CleanHeader).TrimEnd())
    $content = [regex]::Replace($content, '(?s)[ \t]*<!-- Mobile Menu -->.*?<!-- /Mobile Menu -->', (Get-CleanMobileMenu).TrimEnd())
    $content = $content -replace 'blog-standard\.html|blog-two-columns\.html|blog-three-columns\.html', 'blog-single.html'

    Set-Content -LiteralPath $page.FullName -Value $content -NoNewline
}

New-Item -ItemType Directory -Path $archiveRoot -Force | Out-Null
foreach ($name in @("index-v2.html", "blog-standard.html", "blog-two-columns.html", "blog-three-columns.html")) {
    $source = Join-Path $root $name
    if (Test-Path -LiteralPath $source) {
        Move-Item -LiteralPath $source -Destination (Join-Path $archiveRoot $name) -Force
    }
}

$inventory = New-Object System.Collections.Generic.List[string]
$inventory.Add("# Component Inventory")
$inventory.Add("")
$inventory.Add("Kept home page: index.html (home gradient).")
$inventory.Add("Archived pages: archive/archived-pages/index-v2.html, archive/archived-pages/blog-standard.html, archive/archived-pages/blog-two-columns.html, archive/archived-pages/blog-three-columns.html.")
$inventory.Add("")
$inventory.Add("Navigation is simplified to: Home, About, Services, Works, Blog, Contact.")
$inventory.Add("Service Single and Work Single are removed from navigation but retained as root pages and component folders for detail-page linking.")
$inventory.Add("Blog uses blog-single.html as the sole live blog link.")
$inventory.Add("")
$inventory.Add("## Components")
$inventory.Add("")
foreach ($slug in ($sectionsBySlug.Keys | Sort-Object)) {
    $inventory.Add("- ${slug}: " + ((@($pagesBySlug[$slug]) | Sort-Object -Unique) -join ", "))
}

Set-Content -LiteralPath (Join-Path $componentRoot "README.md") -Value (($inventory -join [Environment]::NewLine) + [Environment]::NewLine) -NoNewline
