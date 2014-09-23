#! perl -w

use 5.012;
use warnings;
use strict;
use Cwd qw/getcwd/;

my $target_dir = 'e:/Projects/heroman/Resources/commercial/db';
die if not -d $target_dir;

my @arr = qw/hero word/;
for my$a(@arr){
	my $cmd = "node $a.js > \"$target_dir/$a.lua\"";
	#print $cmd,"\n";
	system($cmd);
	die "Error running $cmd" if $?;
}
